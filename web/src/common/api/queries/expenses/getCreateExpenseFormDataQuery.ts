import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../../interfaces/api-response";
import { getCreateExpenseFormDataDispatch } from "../../dispatch/expense/expense-dispatch";
import { CreateExpenseFormData } from "../../interfaces/expense/expense-api-interfaces";

export const getCreateExpenseFormDataQuery = () => {
  return useQuery<ApiResponse<CreateExpenseFormData>>({
    queryKey: ["expenseList"],
    queryFn: () => getCreateExpenseFormDataDispatch(),
  });
};
