import { PaginationMeta } from '@common/structures/types';
import { ExpenseEntity } from '@modules/expense/core/domain/entities/expense.entity';
import { Expense } from '@prisma/client';

export interface IExpenseRepository {
  createExpense(expense: ExpenseEntity): Promise<Expense>;
  verifyExistence(expense: ExpenseEntity): Promise<{ verifyExistence: boolean; message: string }>;
  getExpenseList(
    page: number,
    limit: number,
    supplierName?: string,
    mouth?: number,
    year?: string,
  ): Promise<{ expenseList: Expense[]; meta: PaginationMeta }>;
  getExpenseById(expenseId: number): Promise<Expense | null>;
}
