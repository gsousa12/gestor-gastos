import { getCreateExpenseFormDataEmpty } from "../../../../modules/expenses/pages/expense-page/expensesPage.controller";
import { api } from "../../axios";
import { ApiResponse } from "../../interfaces/api-response";
import {
  CreateExpenseFormData,
  Expense,
  GetExpenseListRequest,
} from "../../interfaces/expense/expense-api-interfaces";
import { getApiResponse } from "../../interfaces/get-api-response";
import {
  CreateExpenseRequest,
  CreateExpenseResponse,
  DeleteExpenseByIdResponse,
  GetExpenseCreateFormDataResponse,
} from "../../types/api-interfaces";
export const getExpenseListEmpty = {};

export const getExpenseListDispatch = async (
  request: GetExpenseListRequest
): Promise<ApiResponse<Expense[]>> => {
  const { page, supplierName, month, year } = request;
  const response = await api.get("/expense/", {
    params: {
      page,
      supplierName,
      month,
      year,
    },
  });
  return getApiResponse<Expense[]>(response.data, []);
};

export const getCreateExpenseFormDataDispatch = async (): Promise<
  ApiResponse<CreateExpenseFormData>
> => {
  const response = await api.get("/expense/creation-form-data");
  return getApiResponse<CreateExpenseFormData>(
    response.data,
    getCreateExpenseFormDataEmpty
  );
};

export const createExpense = async (
  request: CreateExpenseRequest
): Promise<CreateExpenseResponse> => {
  const response = await api.post("/expense/", request);
  return response.data ?? [];
};

export const deleteExpenseById = async (
  id: number
): Promise<DeleteExpenseByIdResponse> => {
  const response = await api.delete(`/expense/${id}`);
  return response.data ?? [];
};
