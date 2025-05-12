import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PAYMENT_REPOSITORY } from '@common/tokens/repositories.tokens';
import { IPaymentService } from '../interfaces/payment-service.interface';
import { PaymentHelper } from '../helpers/payment.helper';
import { PaymentRepository } from '@modules/payment/infrastructure/repository/payment.repository';
import { Payment } from '@prisma/client';
import { PaymentEntity } from '../../domain/entities/payment.entity';
import { PaginationMeta } from '@common/structures/types';

@Injectable()
export class PaymentService implements IPaymentService {
  constructor(
    @Inject(PAYMENT_REPOSITORY) private readonly paymentRepository: PaymentRepository,
    private readonly paymentHelper: PaymentHelper,
  ) {}

  async createPayment(payment: PaymentEntity): Promise<Payment> {
    const expense = await this.paymentRepository.getExpenseDetails(payment.expenseId);
    if (!expense) {
      throw new NotFoundException('Pagamento não encontrada');
    }

    payment.supplierId = expense.supplierId;
    payment.sectorId = expense.subsector.sectorId;
    payment.mouth = expense.mouth;
    payment.year = expense.year;

    const deducted = await this.paymentRepository.getrecurringDebitDeducted(payment);
    payment.recurringDebitDeducted = deducted.amount;
    payment.recurringDebitDeductedType = deducted.type;
    const createdPayment = await this.paymentRepository.createPayment(payment);
    if (createdPayment.recurringDebitDeducted && createdPayment.recurringDebitDeducted != 0) {
      await this.paymentRepository.changeSupplierDebit(createdPayment);
    }

    return createdPayment;
  }

  async cancelPaymentById(paymentId: number): Promise<Payment> {
    const payment = await this.paymentRepository.getPaymentById(paymentId);
    if (!payment) {
      throw new NotFoundException('Pagamento não encontrado');
    }

    const canceledPayment = await this.paymentRepository.cancelPayment(payment);
    if (canceledPayment.recurringDebitDeducted && canceledPayment.recurringDebitDeducted != 0) {
      await this.paymentRepository.changeSupplierDebit(canceledPayment);
    }

    return canceledPayment;
  }

  async getPaymentList(
    page: number,
    limit: number,
    supplierName?: string,
    mouth?: number,
    year?: string,
  ): Promise<{ paymentList: Payment[]; meta: PaginationMeta }> {
    const { paymentList: paymentList, meta } = await this.paymentRepository.getPaymentList(
      page,
      limit,
      supplierName,
      mouth,
      year,
    );

    return !paymentList || paymentList.length === 0
      ? { paymentList: [], meta }
      : {
          paymentList,
          meta,
        };
  }

  async getPaymentById(paymentId: number): Promise<Payment> {
    const payment = await this.paymentRepository.getPaymentById(paymentId);

    if (!payment) {
      throw new NotFoundException('Pagamento não encontrada.');
    }

    return payment;
  }
}
