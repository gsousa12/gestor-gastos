import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { ApiResponse } from "../../interfaces/api-response";
import { createSecretaryDispatch } from "../../dispatch/secretary/secretary-dispatch";

export interface CreateSecretaryRequest {
  name: string;
}

export const createSecretaryMutation = (): UseMutationResult<
  ApiResponse<null>,
  unknown,
  CreateSecretaryRequest
> => {
  return useMutation({
    mutationFn: (request: CreateSecretaryRequest) =>
      createSecretaryDispatch(request),
  });
};
