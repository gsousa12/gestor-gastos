import { useMutation, UseMutationResult } from "@tanstack/react-query";
import {
  CreateExpenseRequest,
  CreateExpenseResponse,
} from "../../types/api-interfaces";
import { createExpense } from "../../dispatch/expense/expense-dispatch";

export const useCreateExpense = (): UseMutationResult<
  CreateExpenseResponse,
  unknown,
  CreateExpenseRequest
> => {
  return useMutation({
    mutationFn: (request: CreateExpenseRequest) => createExpense(request),
  });
};
