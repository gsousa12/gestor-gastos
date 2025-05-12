import { Expense } from '@prisma/client';
import { ExpenseEntity } from '../../domain/entities/expense.entity';
import { PaginationMeta } from '@common/structures/types';

export interface IExpenseService {
  // Creates
  createExpense(expense: ExpenseEntity): Promise<Expense>;

  // Gets
  getExpenseList(
    page: number,
    limit: number,
    supplierName?: string,
    mouth?: number,
    year?: string,
  ): Promise<{ expenseList: Expense[]; meta: PaginationMeta }>;
  getExpenseById(expenseId: number): Promise<Expense>;
}
