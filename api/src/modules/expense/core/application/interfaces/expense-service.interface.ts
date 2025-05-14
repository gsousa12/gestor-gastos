import { Expense, Secretary, Sector, Supplier } from '@prisma/client';
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
    month?: number,
    year?: string,
  ): Promise<{ expenseList: Expense[]; meta: PaginationMeta }>;
  getExpenseById(expenseId: number): Promise<Expense>;
  getCreationFormData(): Promise<{
    supplierList: { id: number; name: string }[];
    subSectorList: { id: number; name: string }[];
    secretaryList: { id: number; name: string }[];
  }>;
}
