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
    response.month = payment.month;
    response.year = payment.year;
    response.status = payment.status;
    response.amount = payment.amount;
    response.recurringDebitDeducted = payment.recurringDebitDeducted;
    response.createdAt = payment.createdAt;
    return response;
  }

  toMapperCancelPaymentResponse(payment: Payment): PaymentEntity {
    const response = new PaymentEntity();
    response.month = payment.month;
    response.year = payment.year;
    response.status = payment.status;
    response.amount = payment.amount;
    response.recurringDebitDeducted = payment.recurringDebitDeducted;
    response.createdAt = payment.createdAt;
    return response;
  }

  // FIXME: tipar parametro e resposta
  async toMapperGetPaymentListResponse(paymentList: any[]): Promise<any[]> {
    return paymentList.map((payment) => ({
      id: payment.id,
      month: payment.month,
      year: payment.year,
      amount: payment.amount,
      status: payment.status,
      recurringDebitDeducted: payment.recurringDebitDeducted,
      recurringDebitDeductedType: payment.recurringDebitDeductedType,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
      canceledAt: payment.canceledAt ?? null,
      supplierId: payment.expenseId,
      supplierName: payment.supplier?.name || null,
    }));
  }

  async toMapperGetPaymentByIdResponse(payment: Payment): Promise<PaymentEntity> {
    const response = new PaymentEntity();
    response.month = payment.month;
    response.year = payment.year;
    response.amount = payment.amount;
    response.status = payment.status;
    response.recurringDebitDeducted = payment.recurringDebitDeducted;
    response.createdAt = payment.createdAt;
    response.supplierId = payment.supplierId;
    return response;
  }
}
