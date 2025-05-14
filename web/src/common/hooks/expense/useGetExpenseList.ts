import { useMutation, UseMutationResult } from "@tanstack/react-query";
import {
  ExpenseListResponse,
  getExpenseList,
  GetExpenseListRequest,
} from "../../api/expense/expense";

export const useGetExpenseList = (): UseMutationResult<
  ExpenseListResponse, // tipo do retorno
  unknown, // tipo do erro
  GetExpenseListRequest // tipo do argumento
> => {
  return useMutation({
    mutationFn: (request: GetExpenseListRequest) => getExpenseList(request),
  });
};
