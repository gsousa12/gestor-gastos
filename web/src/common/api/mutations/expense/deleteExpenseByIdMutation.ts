import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { deleteExpenseByIdDispatch } from "../../dispatch/expense/expense-dispatch";
import { ApiResponse } from "../../interfaces/api-response";
import { DeleteExpenseByIdRequest } from "../../interfaces/expense/expense-api-interfaces";

export const deleteExpenseByIdMutation = (): UseMutationResult<
  ApiResponse<[]>,
  unknown,
  DeleteExpenseByIdRequest
> => {
  return useMutation({
    mutationFn: (request: DeleteExpenseByIdRequest) =>
      deleteExpenseByIdDispatch(request),
  });
};
