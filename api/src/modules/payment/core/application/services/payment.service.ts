import { Inject, Injectable } from '@nestjs/common';
import { PAYMENT_REPOSITORY } from '@common/tokens/repositories.tokens';
import { IPaymentService } from '../interfaces/payment-service.interface';
import { PaymentHelper } from '../helpers/payment.helper';
import { PaymentRepository } from '@modules/payment/infrastructure/repository/payment.repository';

@Injectable()
export class PaymentService implements IPaymentService {
  constructor(
    @Inject(PAYMENT_REPOSITORY) private readonly paymentRepository: PaymentRepository,
    private readonly paymentHelper: PaymentHelper,
  ) {}
}
