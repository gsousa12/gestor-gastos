import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { ApiResponse } from "../../interfaces/api-response";
import { createSectorDispatch } from "../../dispatch/sector/sector-dispatch";

export interface CreateSectorRequest {
  name: string;
  description: string | null;
}

export const createSectorMutation = (): UseMutationResult<
  ApiResponse<null>,
  unknown,
  CreateSectorRequest
> => {
  return useMutation({
    mutationFn: (request: CreateSectorRequest) => createSectorDispatch(request),
  });
};
