import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { ApiResponse } from "../../interfaces/api-response";
import { CancelPaymentByIdRequest } from "../../interfaces/payment/payment-api-interfaces";
import { cancelPaymentByIdDispatch } from "../../dispatch/payment/payment-dispatch";

export const cancelPaymentByIdMutation = (): UseMutationResult<
  ApiResponse<null>,
  unknown,
  CancelPaymentByIdRequest
> => {
  return useMutation({
    mutationFn: (request: CancelPaymentByIdRequest) =>
      cancelPaymentByIdDispatch(request),
  });
};
