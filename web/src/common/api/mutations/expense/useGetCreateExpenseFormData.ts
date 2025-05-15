import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { GetExpenseCreateFormDataResponse } from "../../types/api-interfaces";
import { getCreateExpenseFormData } from "../../dispatch/expense/expense";

export const useGetCreateExpenseFormData = (): UseMutationResult<
  GetExpenseCreateFormDataResponse, // tipo do retorno
  unknown, // tipo do erro
  void // tipo do argumento
> => {
  return useMutation({
    mutationFn: () => getCreateExpenseFormData(),
  });
};
