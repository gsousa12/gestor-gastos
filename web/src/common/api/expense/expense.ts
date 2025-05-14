import { api } from "../axios";
import {
  CreateExpenseRequest,
  ExpenseListResponse,
  GetExpenseCreateFormDataResponse,
  GetExpenseListRequest,
} from "../types/api-interfaces";

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

export const getCreateExpenseFormData =
  async (): Promise<GetExpenseCreateFormDataResponse> => {
    const response = await api.get("/expense/creation-form-data");
    return response.data ?? [];
  };

export const createExpense = async (
  request: CreateExpenseRequest
): Promise<void> => {
  const response = await api.post("/expense/", request);
  return response.data ?? [];
};
