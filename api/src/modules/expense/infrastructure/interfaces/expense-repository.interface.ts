import { PaginationMeta } from '@common/structures/types';
import { ExpenseEntity } from '@modules/expense/core/domain/entities/expense.entity';
import { Expense, Secretary, SubSector, Supplier } from '@prisma/client';

export interface IExpenseRepository {
  // Creates
  createExpense(expense: ExpenseEntity): Promise<Expense>;

  // Gets
  getExpenseList(
    page: number,
    limit: number,
    supplierName?: string,
    month?: number,
    year?: string,
  ): Promise<{ expenseList: Expense[]; meta: PaginationMeta }>;
  getExpenseById(expenseId: number): Promise<Expense | null>;
  getCreationFormData(): Promise<{
    supplierList: { id: number; name: string }[];
    subSectorList: { id: number; name: string }[];
    secretaryList: { id: number; name: string }[];
  }>;

  // Others
  verifyExistence(expense: ExpenseEntity): Promise<{ verifyExistence: boolean; message: string }>;
}
