import { useQuery } from "@tanstack/react-query";
import {
  GetPaymentListRequest,
  Payment,
} from "../../interfaces/payment/payment-api-interfaces";
import { ApiResponse } from "../../interfaces/api-response";
import { getPaymentListDispatch } from "../../dispatch/payment/payment-dispatch";

export const getPaymentListQuery = (request: GetPaymentListRequest) => {
  return useQuery<ApiResponse<Payment[]>>({
    queryKey: ["paymentList", request],
    queryFn: () => getPaymentListDispatch(request),
  });
};
