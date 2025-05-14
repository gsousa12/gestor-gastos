import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { GetExpenseCreateFormDataResponse } from "../../api/types/api-interfaces";
import { getCreateExpenseFormData } from "../../api/expense/expense";

export const useGetCreateExpenseFormData = (): UseMutationResult<
  GetExpenseCreateFormDataResponse, // tipo do retorno
  unknown, // tipo do erro
  void // tipo do argumento
> => {
  return useMutation({
    mutationFn: () => getCreateExpenseFormData(),
  });
};
