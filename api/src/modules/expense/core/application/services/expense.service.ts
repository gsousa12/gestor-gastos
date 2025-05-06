import { Inject, Injectable } from '@nestjs/common';
import { IExpenseService } from '../interfaces/expense-service.interface';
import { EXPENSE_REPOSITORY } from '@common/tokens/repositories.tokens';
import { ExpenseRepository } from '@modules/expense/infrastructure/repository/expense.repository';
import { ExpenseHelper } from '../helpers/expense.helper';

@Injectable()
export class ExpenseService implements IExpenseService {
  constructor(
    @Inject(EXPENSE_REPOSITORY) private readonly expenseRepository: ExpenseRepository,
    private readonly expenseHelper: ExpenseHelper,
  ) {}
}
