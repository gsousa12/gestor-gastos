import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { DeleteExpenseByIdResponse } from "../../api/types/api-interfaces";
import { deleteExpenseById } from "../../api/expense/expense";

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
