import { api } from "../axios";
import {
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
