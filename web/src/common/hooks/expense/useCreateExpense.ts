import { useMutation, UseMutationResult } from "@tanstack/react-query";
import {
  CreateExpenseRequest,
  CreateExpenseResponse,
} from "../../api/types/api-interfaces";
import { createExpense } from "../../api/expense/expense";

export const useCreateExpense = (): UseMutationResult<
  CreateExpenseResponse,
  unknown,
  CreateExpenseRequest
> => {
  return useMutation({
    mutationFn: (request: CreateExpenseRequest) => createExpense(request),
  });
};
