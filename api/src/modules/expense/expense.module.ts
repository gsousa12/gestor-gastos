import { Module } from '@nestjs/common';
import { ExpenseController } from './http/controller/expense.controller';
import { EXPENSE_REPOSITORY } from '@common/tokens/repositories.tokens';
import { ExpenseRepository } from './infrastructure/repository/expense.repository';
import { ExpenseService } from './core/application/services/expense.service';
import { ExpenseHelper } from './core/application/helpers/expense.helper';
import { PrismaService } from '@common/modules/prisma/service/prisma.service';
import { ExpenseMapper } from './core/application/mappers/expense.mapper';

@Module({
  imports: [],
  controllers: [ExpenseController],
  providers: [
    {
      provide: EXPENSE_REPOSITORY,
      useClass: ExpenseRepository,
    },
    ExpenseService,
    ExpenseHelper,
    PrismaService,
    ExpenseMapper,
  ],
  exports: [],
})
export class ExpenseModule {}
