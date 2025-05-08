import { ExpenseMapper } from '@modules/expense/core/application/mappers/expense.mapper';
import { ExpenseService } from '@modules/expense/core/application/services/expense.service';
import { PaymentMapper } from '@modules/payment/core/application/mappers/payment.mapper';
import { PaymentService } from '@modules/payment/core/application/services/payment.service';
import { Controller } from '@nestjs/common';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly paymentMapper: PaymentMapper,
  ) {}
}
