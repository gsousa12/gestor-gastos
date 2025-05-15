import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { DeleteExpenseByIdResponse } from "../../types/api-interfaces";
import { deleteExpenseById } from "../../dispatch/expense/expense";

export const useDeleteExpenseById = (): UseMutationResult<
  DeleteExpenseByIdResponse, // tipo do retorno
  unknown, // tipo do erro
  number // tipo do argumento
> => {
  return useMutation({
    mutationFn: (id: number) => deleteExpenseById(id),
    onSuccess: () => {},
  });
};
