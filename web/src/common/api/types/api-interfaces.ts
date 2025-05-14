import { PaginationMeta } from "../../utils/types";
import { Expense, ExpenseCreateFormData } from "./api-types";

/* REQUEST */
export interface GetExpenseListRequest {
  page: number;
  supplierName?: string;
  month?: number;
  year?: string;
}

/* RESPONSE */
export interface ExpenseListResponse {
  message: string;
  pagination: PaginationMeta;
  data: Expense[];
}

export interface GetExpenseCreateFormDataResponse {
  message: string;
  pagination: PaginationMeta;
  data: ExpenseCreateFormData;
}
