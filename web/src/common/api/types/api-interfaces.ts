import { PaginationMeta } from "../interfaces/api-response";
import {
  CreateExpenseFormData,
  Expense,
} from "../interfaces/expense/expense-api-interfaces";

/* REQUEST */

// FIXME: Padronizar o response do data sendo ARRAY OU OBJETO
/* RESPONSE */
export interface ExpenseListResponse {
  message: string;
  pagination: PaginationMeta;
  data: Expense[];
}

export interface CreateExpenseResponse {
  message: string;
  data: Expense[];
}

export interface DeleteExpenseByIdResponse {
  message: string;
  data: [];
}

export interface GetExpenseCreateFormDataResponse {
  message: string;
  pagination: PaginationMeta;
  data: CreateExpenseFormData;
}

export interface SupplierWithDebit {
  id: number;
  name: string;
  recurringDebit: number;
}

export interface LastExpenses {
  id: number;
  supplierName: string;
  description: string | null;
  amount: number;
  date: string;
}
