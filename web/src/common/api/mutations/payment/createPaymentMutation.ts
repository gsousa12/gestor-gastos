import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { ApiResponse } from "../../interfaces/api-response";
import { CreatePaymentRequest } from "../../interfaces/payment/payment-api-interfaces";
import { createPaymentDispatch } from "../../dispatch/payment/payment-dispatch";

export const createPaymentMutation = (): UseMutationResult<
  ApiResponse<null>,
  unknown,
  CreatePaymentRequest
> => {
  return useMutation({
    mutationFn: (request: CreatePaymentRequest) =>
      createPaymentDispatch(request),
  });
};
