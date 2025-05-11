import { Payment } from '@prisma/client';
import { PaymentEntity } from '../../domain/entities/payment.entity';
import { CreatePaymentRequestDto } from '../dtos/request/create-payment.request.dto';

export class PaymentMapper {
  toMapperCreatePaymentRequest(request: CreatePaymentRequestDto): PaymentEntity {
    const payment = new PaymentEntity();
    payment.amount = request.amount;
    payment.expenseId = request.expenseId;
    return payment;
  }

  toMapperCreatePaymentResponse(payment: Payment): PaymentEntity {
    const response = new PaymentEntity();
    response.mouth = payment.mouth;
    response.year = payment.year;
    response.status = payment.status;
    response.amount = payment.amount;
    response.recurringDebitDeducted = payment.recurringDebitDeducted;
    response.createdAt = payment.createdAt;
    return response;
  }

  toMapperCancelPaymentResponse(payment: Payment): PaymentEntity {
    const response = new PaymentEntity();
    response.mouth = payment.mouth;
    response.year = payment.year;
    response.status = payment.status;
    response.amount = payment.amount;
    response.recurringDebitDeducted = payment.recurringDebitDeducted;
    response.createdAt = payment.createdAt;
    return response;
  }

  async toMapperGetPaymentListResponse(supplierList: Payment[]): Promise<PaymentEntity[]> {
    const response = supplierList.map((supplier) => {
      const payment = new PaymentEntity();
      payment.id = supplier.id;
      payment.mouth = supplier.mouth;
      payment.year = supplier.year;
      payment.amount = supplier.amount;
      payment.status = supplier.status;
      payment.recurringDebitDeducted = supplier.recurringDebitDeducted;
      payment.createdAt = supplier.createdAt;
      payment.supplierId = supplier.supplierId;
      payment.supplierName = supplier.supplierName;
      return payment;
    });
    return response;
  }

  async toMapperGetPaymentByIdResponse(payment: Payment): Promise<PaymentEntity> {
    const response = new PaymentEntity();
    response.mouth = payment.mouth;
    response.year = payment.year;
    response.amount = payment.amount;
    response.status = payment.status;
    response.recurringDebitDeducted = payment.recurringDebitDeducted;
    response.createdAt = payment.createdAt;
    response.supplierId = payment.supplierId;
    response.supplierName = payment.supplierName;
    return response;
  }
}
