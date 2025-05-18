import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { createExpenseDispatch } from "../../dispatch/expense/expense-dispatch";
import { ApiResponse } from "../../interfaces/api-response";
import {
  CreateExpenseRequest,
  Expense,
} from "../../interfaces/expense/expense-api-interfaces";

export const createExpenseMutation = (): UseMutationResult<
  ApiResponse<Expense>,
  unknown,
  CreateExpenseRequest
> => {
  return useMutation({
    mutationFn: (request: CreateExpenseRequest) =>
      createExpenseDispatch(request),
  });
};
