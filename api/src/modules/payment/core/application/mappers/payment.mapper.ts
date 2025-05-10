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
    response.recurringDebtDeducted = payment.recurringDebtDeducted;
    response.createdAt = payment.createdAt;
    return response;
  }

  toMapperCancelPaymentResponse(payment: Payment): PaymentEntity {
    const response = new PaymentEntity();
    response.mouth = payment.mouth;
    response.year = payment.year;
    response.status = payment.status;
    response.amount = payment.amount;
    response.recurringDebtDeducted = payment.recurringDebtDeducted;
    response.createdAt = payment.createdAt;
    return response;
  }
}
