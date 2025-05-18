import { useQuery } from "@tanstack/react-query";
import {
  Expense,
  GetExpenseListRequest,
} from "../../interfaces/expense/expense-api-interfaces";
import { getExpenseListDispatch } from "../../dispatch/expense/expense-dispatch";
import { ApiResponse } from "../../interfaces/api-response";

export const getExpenseListQuery = (request: GetExpenseListRequest) => {
  return useQuery<ApiResponse<Expense[]>>({
    queryKey: ["expenseList", request],
    queryFn: () => getExpenseListDispatch(request),
  });
};
