import { PrismaService } from '@common/modules/prisma/service/prisma.service';
import { Injectable } from '@nestjs/common';
import { IPaymentRepository } from '../interfaces/payment-repository.interface';
import { PaymentEntity } from '@modules/payment/core/domain/entities/payment.entity';
import { Payment } from '@prisma/client';
import { PaymentStatus, RecurringDebitDeductedType } from '@modules/payment/core/domain/enums/payment.enum';
import { PaginationMeta } from '@common/structures/types';
import { ExpenseStatus } from '@modules/expense/core/domain/enums/expense.enum';

@Injectable()
export class PaymentRepository implements IPaymentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createPayment(payment: PaymentEntity): Promise<Payment> {
    const createdPayment = await this.prisma.payment.create({
      data: {
        month: payment.month,
        year: payment.year,
        amount: payment.amount,
        status: PaymentStatus.ACTIVE,
        recurringDebitDeducted: payment.recurringDebitDeducted,
        recurringDebitDeductedType: payment.recurringDebitDeductedType,
        createdAt: new Date(),
        supplierId: payment.supplierId,
        sectorId: payment.sectorId,
        expenseId: payment.expenseId,
      },
    });

    await this.prisma.expense.update({
      where: { id: createdPayment.expenseId },
      data: {
        status: ExpenseStatus.PAID,
      },
    });

    return createdPayment;
  }

  async getExpenseDetails(expenseId: number) {
    return this.prisma.expense.findUnique({
      where: { id: expenseId },
      include: {
        subsector: {
          select: {
            sectorId: true,
          },
        },
      },
    });
  }

  async getrecurringDebitDeducted(payment: PaymentEntity): Promise<{
    amount: number;
    type: RecurringDebitDeductedType;
  }> {
    const expense = await this.prisma.expense.findFirst({
      where: {
        id: payment.expenseId,
        subsector: { sectorId: payment.sectorId },
      },
      select: {
        amount: true,
      },
    });

    const difference = payment.amount - expense!.amount;

    return {
      amount: Math.abs(difference),
      type: difference >= 0 ? RecurringDebitDeductedType.DEDUCTION : RecurringDebitDeductedType.INCREMENT,
    };
  }

  async verifyExistence(payment: PaymentEntity): Promise<{ verifyExistence: boolean; message: string }> {
    const expense = await this.prisma.expense.findUnique({
      where: { id: payment.expenseId },
      include: {
        subsector: { select: { sectorId: true } },
      },
    });

    if (!expense) return { verifyExistence: false, message: 'Despesa não encontrada' };

    const [supplier, sector] = await Promise.all([
      this.prisma.supplier.findUnique({ where: { id: expense.supplierId } }),
      this.prisma.sector.findUnique({ where: { id: expense.subsector.sectorId } }),
    ]);

    if (!supplier) return { verifyExistence: false, message: 'Fornecedor não encontrado' };
    if (!sector) return { verifyExistence: false, message: 'Setor não encontrado' };

    return { verifyExistence: true, message: 'Todos os dados existem' };
  }

  async changeSupplierDebit(payment: Payment): Promise<void> {
    const { recurringDebitDeducted, recurringDebitDeductedType } = payment;

    if (!recurringDebitDeducted || recurringDebitDeducted === 0 || !recurringDebitDeductedType) return;

    const isCanceled = payment.status === PaymentStatus.CANCELED;

    // Lógica:
    // - Pagamento ativo com type INCREMENT => aumenta a dívida
    // - Pagamento cancelado com type INCREMENT => reduz a dívida
    // - Pagamento ativo com type DEDUCTED => reduz a dívida
    // - Pagamento cancelado com type DEDUCTED => aumenta a dívida

    const shouldIncrement =
      (recurringDebitDeductedType === RecurringDebitDeductedType.INCREMENT && !isCanceled) ||
      (recurringDebitDeductedType === RecurringDebitDeductedType.DEDUCTION && isCanceled);

    await this.prisma.supplier.update({
      where: { id: payment.supplierId },
      data: {
        recurringDebit: {
          [shouldIncrement ? 'increment' : 'decrement']: recurringDebitDeducted,
        },
      },
    });
  }

  async getPaymentById(paymentId: number): Promise<Payment | null> {
    return await this.prisma.payment.findUnique({
      where: { id: paymentId },
    });
  }

  async cancelPayment(payment: Payment): Promise<Payment> {
    const updatedPayment = await this.prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: PaymentStatus.CANCELED,
        updatedAt: new Date(),
        cacelledAt: new Date(),
      },
      include: {
        supplier: true,
      },
    });

    await this.prisma.expense.update({
      where: { id: payment.expenseId },
      data: {
        status: ExpenseStatus.PENDING,
        updatedAt: new Date(),
      },
    });

    return updatedPayment;
  }

  async getPaymentList(
    page: number,
    limit: number,
    supplierName?: string,
    month?: number,
    year?: string,
  ): Promise<{ paymentList: Payment[]; meta: PaginationMeta }> {
    const skip = (page - 1) * limit;

    const whereClause: any = {};

    if (supplierName) {
      whereClause.supplierName = { contains: supplierName, mode: 'insensitive' };
    }

    if (month) {
      whereClause.month = month;
    }

    if (year) {
      whereClause.year = year;
    }

    const [paymentList, totalCount] = await Promise.all([
      this.prisma.payment.findMany({
        where: whereClause,
        skip,
        take: limit,
        include: {
          supplier: {
            select: {
              name: true,
            },
          },
        },
      }),
      this.prisma.payment.count({
        where: whereClause,
      }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      paymentList: paymentList,
      meta: {
        totalItems: totalCount,
        itemsPerPage: limit,
        currentPage: page,
        totalPages,
      },
    };
  }

  async getPaymentByExpenseId(expenseId: number): Promise<Payment | null> {
    return await this.prisma.payment.findFirst({
      where: {
        expenseId,
        status: { not: PaymentStatus.CANCELED },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
