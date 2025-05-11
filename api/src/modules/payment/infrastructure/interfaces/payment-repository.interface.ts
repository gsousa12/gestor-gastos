import { PaginationMeta } from '@common/structures/types';
import { PaymentEntity } from '@modules/payment/core/domain/entities/payment.entity';
import { Payment } from '@prisma/client';

export interface IPaymentRepository {
  // Creates
  createPayment(payment: PaymentEntity): Promise<Payment>;

  // Gets
  getExpenseDetails(expenseId: number);
  getRecurringDebtDeducted(payment: PaymentEntity): Promise<number>;
  getPaymentById(paymentId: number): Promise<Payment | null>;
  getPaymentList(
    page: number,
    limit: number,
    supplierName?: string,
    mouth?: number,
    year?: string,
  ): Promise<{ paymentList: Payment[]; meta: PaginationMeta }>;
  getPaymentById(paymentId: number): Promise<Payment | null>;

  // Others
  verifyExistence(payment: PaymentEntity): Promise<{ verifyExistence: boolean; message: string }>;
  changeSupplierDebt(payment: Payment): Promise<void>;
  cancelPayment(payment: Payment): Promise<Payment>;
}
