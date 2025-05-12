import { PaginationMeta } from '@common/structures/types';
import { ExpenseEntity } from '@modules/expense/core/domain/entities/expense.entity';
import { Expense } from '@prisma/client';

export interface IExpenseRepository {
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
  getExpenseById(expenseId: number): Promise<Expense | null>;

  // Others
  verifyExistence(expense: ExpenseEntity): Promise<{ verifyExistence: boolean; message: string }>;
}
