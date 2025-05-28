import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../../interfaces/api-response";
import { GetExpenseDetailsRequest } from "../../interfaces/expense/expense-api-interfaces";
import { getExpenseDetailsDispatch } from "../../dispatch/expense/expense-dispatch";

export const getExpenseDetailsQuery = (
  request: GetExpenseDetailsRequest,
  options?: { enabled?: boolean }
) => {
  return useQuery<ApiResponse<any>>({
    queryKey: ["expenseDetails", request],
    queryFn: () => getExpenseDetailsDispatch(request),
    enabled: options?.enabled,
  });
};
