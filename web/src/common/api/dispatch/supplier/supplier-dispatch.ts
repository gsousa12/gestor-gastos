import { api } from "../../axios";
import { ApiResponse } from "../../interfaces/api-response";
import { getApiResponse } from "../../interfaces/get-api-response";
import {
  GetSupplierListRequest,
  Supplier,
} from "../../interfaces/supplier/supplier-api-interfaces";

export const getSupplierListDispatch = async (
  request: GetSupplierListRequest
): Promise<ApiResponse<Supplier[]>> => {
  const { page, name, has_debits } = request;
  const response = await api.get("/supplier/", {
    params: {
      page,
      name,
      has_debits,
    },
  });
  return getApiResponse<Supplier[]>(response.data, []);
};
