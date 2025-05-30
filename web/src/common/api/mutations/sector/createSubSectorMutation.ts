import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { ApiResponse } from "../../interfaces/api-response";
import { createSubSectorDispatch } from "../../dispatch/sector/sector-dispatch";

export interface CreateSubSectorRequest {
  name: string;
  sectorId: number;
}

export const createSubSectorMutation = (): UseMutationResult<
  ApiResponse<null>,
  unknown,
  CreateSubSectorRequest
> => {
  return useMutation({
    mutationFn: (request: CreateSubSectorRequest) =>
      createSubSectorDispatch(request),
  });
};
