import { ExpenseEntity } from '@modules/expense/core/domain/entities/expense.entity';

export type PaginationMeta = {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
};

interface SupplierWithDebit {
  id: number;
  name: string;
  recurringDebit: number;
}

interface LastExpenses {
  id: number;
  supplierName: string;
  description: string | null;
  amount: number;
  date: Date;
}

export interface DashboardData {
  activeSuppliers: number;
  expensesMonthSomatory: number;
  paymentsMonthSomatory: number;
  lastExpenses: LastExpenses[];
  supplierWithMostDebits: SupplierWithDebit[];
}
