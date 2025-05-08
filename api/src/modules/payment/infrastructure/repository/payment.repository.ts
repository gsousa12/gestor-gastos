import { PrismaService } from '@common/modules/prisma/service/prisma.service';
import { Injectable } from '@nestjs/common';
import { IPaymentRepository } from '../interfaces/payment-repository.interface';

@Injectable()
export class PaymentRepository implements IPaymentRepository {
  constructor(private readonly prisma: PrismaService) {}
}
