import { PaginationMeta } from "../../utils/interfaces";
import { api } from "../axios";

export interface GetExpenseListRequest {
  page: number;
  supplierName?: string;
  month?: number;
  year?: string;
}

export type Expense = {
  id: number;
  description: string | null;
  month: number;
  year: string;
  amount: number;
  supplierId: number;
  secretaryId: number;
  userId: number;
  subsectorId: number;
  createdAt: string;
  supplierName: string;
  subsectorName: string;
};

export interface ExpenseListResponse {
  message: string;
  pagination: PaginationMeta;
  data: Expense[];
}

export const getExpenseList = async (
  request: GetExpenseListRequest
): Promise<ExpenseListResponse> => {
  const { page, supplierName, month, year } = request;
  const response = await api.get("/expense/", {
    params: {
      page,
      supplierName,
      month,
      year,
    },
  });
  return response.data ?? [];
};
