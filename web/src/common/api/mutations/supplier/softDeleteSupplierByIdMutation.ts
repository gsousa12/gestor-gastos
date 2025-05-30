import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { ApiResponse } from "../../interfaces/api-response";
import { SoftDeleteSupplierByIdRequest } from "../../interfaces/supplier/supplier-api-interfaces";
import { softDeleteSupplierByIdDispatch } from "../../dispatch/supplier/supplier-dispatch";

export const softDeleteSupplierByIdMutation = (): UseMutationResult<
  ApiResponse<null>,
  unknown,
  SoftDeleteSupplierByIdRequest
> => {
  return useMutation({
    mutationFn: (request: SoftDeleteSupplierByIdRequest) =>
      softDeleteSupplierByIdDispatch(request),
  });
};
