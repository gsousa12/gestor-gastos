import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { ApiResponse } from "../../interfaces/api-response";
import { softDeleteSubSectorByIdDispatch } from "../../dispatch/sector/sector-dispatch";

export interface SoftDeleteSubSectorByIdRequest {
  id: number;
}

export const softDeleteSubSectorByIdMutation = (): UseMutationResult<
  ApiResponse<null>,
  unknown,
  SoftDeleteSubSectorByIdRequest
> => {
  return useMutation({
    mutationFn: (request: SoftDeleteSubSectorByIdRequest) =>
      softDeleteSubSectorByIdDispatch(request),
  });
};
