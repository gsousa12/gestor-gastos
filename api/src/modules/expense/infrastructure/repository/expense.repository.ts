import { PrismaService } from '@common/modules/prisma/service/prisma.service';
import { Injectable } from '@nestjs/common';
import { IExpenseRepository } from '../interfaces/expense-repository.interface';

@Injectable()
export class ExpenseRepository implements IExpenseRepository {
  constructor(private readonly prisma: PrismaService) {}
}
