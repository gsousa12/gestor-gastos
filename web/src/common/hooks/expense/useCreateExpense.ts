import { useMutation, UseMutationResult } from "@tanstack/react-query";
import {
  CreateExpenseRequest,
  CreateExpenseResponse,
} from "../../api/types/api-interfaces";
import { createExpense } from "../../api/expense/expense";

export const useCreateExpense = (): UseMutationResult<
  CreateExpenseResponse, // tipo do retorno
  unknown, // tipo do erro
  CreateExpenseRequest // tipo do argumento
> => {
  return useMutation({
    mutationFn: (request: CreateExpenseRequest) => createExpense(request),
  });
};
