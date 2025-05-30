import { getCreateExpenseFormDataEmpty } from "../../../../modules/expenses/pages/expense-page/expensesPage.controller";
import { api } from "../../axios";
import { ApiResponse } from "../../interfaces/api-response";
import {
  CreateExpenseFormData,
  CreateExpenseRequest,
  DeleteExpenseByIdRequest,
  Expense,
  GetExpenseDetailsRequest,
  GetExpenseListRequest,
} from "../../interfaces/expense/expense-api-interfaces";
import { getApiResponse } from "../../interfaces/get-api-response";
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

export const createExpenseDispatch = async (
  request: CreateExpenseRequest
): Promise<ApiResponse<Expense>> => {
  try {
    const response = await api.post("/expense/", request);
    return getApiResponse<Expense>(response.data, {} as Expense);
  } catch (error) {
    throw error;
  }
};

export const deleteExpenseByIdDispatch = async (
  request: DeleteExpenseByIdRequest
): Promise<ApiResponse<[]>> => {
  try {
    const { id } = request;
    const response = await api.delete(`/expense/${id}`);
    return getApiResponse<[]>(response.data, []);
  } catch (error) {
    throw error;
  }
};

export const getExpenseDetailsDispatch = async (
  request: GetExpenseDetailsRequest
): Promise<ApiResponse<any>> => {
  const { id } = request;
  const response = await api.get(`/expense/${id}`);
  return getApiResponse<GetExpenseDetailsRequest>(
    response.data,
    {} as GetExpenseDetailsRequest
  );
};
