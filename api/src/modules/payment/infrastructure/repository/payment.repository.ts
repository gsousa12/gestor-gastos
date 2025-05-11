import { PrismaService } from '@common/modules/prisma/service/prisma.service';
import { Injectable } from '@nestjs/common';
import { IPaymentRepository } from '../interfaces/payment-repository.interface';
import { PaymentEntity } from '@modules/payment/core/domain/entities/payment.entity';
import { Payment } from '@prisma/client';
import { PaymentStatus } from '@modules/payment/core/domain/enums/payment.enum';
import { PaginationMeta } from '@common/structures/types';

@Injectable()
export class PaymentRepository implements IPaymentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createPayment(payment: PaymentEntity): Promise<Payment> {
    const supplier = await this.prisma.supplier.findUnique({
      where: { id: payment.supplierId },
      select: { name: true },
    });
    return this.prisma.payment.create({
      data: {
        mouth: payment.mouth,
        year: payment.year,
        amount: payment.amount,
        status: PaymentStatus.ATIVO,
        recurringDebtDeducted: payment.recurringDebtDeducted,
        createdAt: new Date(),
        supplierId: payment.supplierId,
        supplierName: supplier?.name,
        sectorId: payment.sectorId,
        expenseId: payment.expenseId,
      },
    });
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

  async getRecurringDebtDeducted(payment: PaymentEntity): Promise<number> {
    const expense = await this.prisma.expense.findFirst({
      where: {
        id: payment.expenseId,
        subsector: {
          sectorId: payment.sectorId,
        },
      },
      select: {
        amount: true,
      },
    });

    return payment.amount - expense!.amount;
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

  async changeSupplierDebt(payment: Payment): Promise<void> {
    const difference = payment.recurringDebtDeducted;
    if (!difference || difference === 0) return;
    if (payment.status !== PaymentStatus.CANCELADO) {
      await this.prisma.supplier.update({
        where: { id: payment.supplierId },
        data: {
          recurringDebit: {
            [difference > 0 ? 'decrement' : 'increment']: Math.abs(difference),
          },
        },
      });
    } else {
      await this.prisma.supplier.update({
        where: { id: payment.supplierId },
        data: {
          recurringDebit: {
            [difference > 0 ? 'increment' : 'decrement']: Math.abs(difference),
          },
        },
      });
    }
  }

  async getPaymentById(paymentId: number): Promise<Payment | null> {
    return await this.prisma.payment.findUnique({
      where: { id: paymentId },
    });
  }

  async cancelPayment(payment: Payment): Promise<Payment> {
    return await this.prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: PaymentStatus.CANCELADO,
        updatedAt: new Date(),
        cacelledAt: new Date(),
      },
    });
  }

  async getPaymentList(
    page: number,
    limit: number,
    supplierName?: string,
    mouth?: number,
    year?: string,
  ): Promise<{ paymentList: Payment[]; meta: PaginationMeta }> {
    const skip = (page - 1) * limit;

    const whereClause: any = {};

    if (supplierName) {
      whereClause.supplierName = { contains: supplierName, mode: 'insensitive' };
    }

    if (mouth) {
      whereClause.mouth = mouth;
    }

    if (year) {
      whereClause.year = year;
    }

    const [paymentList, totalCount] = await Promise.all([
      this.prisma.payment.findMany({
        where: whereClause,
        skip,
        take: limit,
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
}
