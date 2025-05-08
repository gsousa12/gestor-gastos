import { Module } from '@nestjs/common';
import { PaymentController } from './http/controller/payment.controller';
import { PAYMENT_REPOSITORY } from '@common/tokens/repositories.tokens';
import { PaymentRepository } from './infrastructure/repository/payment.repository';
import { PaymentService } from './core/application/services/payment.service';
import { PaymentHelper } from './core/application/helpers/payment.helper';
import { PrismaService } from '@common/modules/prisma/service/prisma.service';
import { PaymentMapper } from './core/application/mappers/payment.mapper';

@Module({
  imports: [],
  controllers: [PaymentController],
  providers: [
    {
      provide: PAYMENT_REPOSITORY,
      useClass: PaymentRepository,
    },
    PaymentService,
    PaymentHelper,
    PrismaService,
    PaymentMapper,
  ],
  exports: [],
})
export class PaymentModule {}
