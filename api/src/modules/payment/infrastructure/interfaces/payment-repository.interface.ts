import { PaginationMeta } from '@common/structures/types';
import { PaymentEntity } from '@modules/payment/core/domain/entities/payment.entity';
import { RecurringDebitDeductedType } from '@modules/payment/core/domain/enums/payment.enum';
import { Payment } from '@prisma/client';

export interface IPaymentRepository {
  // Creates
  createPayment(payment: PaymentEntity): Promise<Payment>;

  // Gets
  getExpenseDetails(expenseId: number);
  getrecurringDebitDeducted(payment: PaymentEntity): Promise<{
    amount: number;
    type: RecurringDebitDeductedType;
  }>;
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
  changeSupplierDebit(payment: Payment): Promise<void>;
  cancelPayment(payment: Payment): Promise<Payment>;
}
