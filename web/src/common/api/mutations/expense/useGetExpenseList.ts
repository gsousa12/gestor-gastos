import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { getExpenseList } from "../../dispatch/expense/expense";
import {
  ExpenseListResponse,
  GetExpenseListRequest,
} from "../../types/api-interfaces";

export const useGetExpenseList = (): UseMutationResult<
  ExpenseListResponse, // tipo do retorno
  unknown, // tipo do erro
  GetExpenseListRequest // tipo do argumento
> => {
  return useMutation({
    mutationFn: (request: GetExpenseListRequest) => getExpenseList(request),
  });
};
