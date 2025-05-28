import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { ApiResponse } from "../../interfaces/api-response";
import { CreateSupplierRequest } from "../../interfaces/supplier/supplier-api-interfaces";
import { createSupplierDispatch } from "../../dispatch/supplier/supplier-dispatch";

export const createSupplierMutation = (): UseMutationResult<
  ApiResponse<null>,
  unknown,
  CreateSupplierRequest
> => {
  return useMutation({
    mutationFn: (request: CreateSupplierRequest) =>
      createSupplierDispatch(request),
  });
};
