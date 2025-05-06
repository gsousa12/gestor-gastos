import { ExpenseMapper } from '@modules/expense/core/application/mappers/expense.mapper';
import { ExpenseService } from '@modules/expense/core/application/services/expense.service';
import { Controller } from '@nestjs/common';

@Controller('expense')
export class ExpenseController {
  constructor(
    private readonly expenseService: ExpenseService,
    private readonly expenseMapper: ExpenseMapper,
  ) {}
}
