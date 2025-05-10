import { Payment } from '@prisma/client';
import { PaymentEntity } from '../../domain/entities/payment.entity';

export interface IPaymentService {
  createPayment(payment: PaymentEntity): Promise<Payment>;
  cancelPaymentById(paymentId: number): Promise<Payment>;
}
