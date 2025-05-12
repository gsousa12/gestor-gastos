import { Payment } from '@prisma/client';
import { PaymentEntity } from '../../domain/entities/payment.entity';
import { PaginationMeta } from '@common/structures/types';

export interface IPaymentService {
  createPayment(payment: PaymentEntity): Promise<Payment>;
  cancelPaymentById(paymentId: number): Promise<Payment>;
  getPaymentList(
    page: number,
    limit: number,
    supplierName?: string,
    month?: number,
    year?: string,
  ): Promise<{ paymentList: Payment[]; meta: PaginationMeta }>;
  getPaymentById(paymentId: number): Promise<Payment>;
}
