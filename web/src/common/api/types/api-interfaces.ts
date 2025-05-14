import { PaginationMeta } from "../../utils/types";
import { Expense, ExpenseCreateFormData } from "./api-types";

/* REQUEST */
export interface GetExpenseListRequest {
  page: number;
  supplierName?: string;
  month?: number;
  year?: string;
}

export interface CreateExpenseRequest {
  description: string | null;
  month: number;
  year: string;
  amount: number;
  supplierId: number;
  secretaryId: number;
  userId: number;
}
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
  data: ExpenseCreateFormData;
}
