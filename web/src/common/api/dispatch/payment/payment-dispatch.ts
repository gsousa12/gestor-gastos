import { api } from "../../axios";
import { ApiResponse } from "../../interfaces/api-response";
import { getApiResponse } from "../../interfaces/get-api-response";
import {
  CancelPaymentByIdRequest,
  CreatePaymentRequest,
  GetPaymentDetailsRequest,
  GetPaymentListRequest,
  Payment,
} from "../../interfaces/payment/payment-api-interfaces";
import { PaymentDetailsResponse } from "../../queries/expenses/getPaymentDetailsQuery";

export const getPaymentListDispatch = async (
  request: GetPaymentListRequest
): Promise<ApiResponse<Payment[]>> => {
  const { page, supplierName, month, year } = request;
  const response = await api.get("/payment/", {
    params: {
      page,
      supplierName,
      month,
      year,
    },
  });
  return getApiResponse<Payment[]>(response.data, []);
};

export const createPaymentDispatch = async (
  request: CreatePaymentRequest
): Promise<ApiResponse<null>> => {
  const response = await api.post("/payment/", request);
  return getApiResponse<null>(response.data, null);
};

export const cancelPaymentByIdDispatch = async (
  request: CancelPaymentByIdRequest
): Promise<ApiResponse<null>> => {
  const { id } = request;
  const response = await api.post(`/payment/cancel/${id}`);
  return getApiResponse<null>(response.data, null);
};

export const getPaymentDetailsDispatch = async (
  request: GetPaymentDetailsRequest
): Promise<ApiResponse<PaymentDetailsResponse>> => {
  const { id } = request;
  const response = await api.get(`/payment/${id}`);
  return getApiResponse<PaymentDetailsResponse>(
    response.data,
    {} as PaymentDetailsResponse
  );
};
