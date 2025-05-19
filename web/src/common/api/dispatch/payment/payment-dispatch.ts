import { api } from "../../axios";
import { ApiResponse } from "../../interfaces/api-response";
import { getApiResponse } from "../../interfaces/get-api-response";
import {
  GetPaymentListRequest,
  Payment,
} from "../../interfaces/payment/payment-api-interfaces";

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
