import { api } from "../../axios";
import { ApiResponse } from "../../interfaces/api-response";
import { getApiResponse } from "../../interfaces/get-api-response";
import {
  GetSupplierByIdRequest,
  GetSupplierListRequest,
  Supplier,
  SupplierDetailsResponse,
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

export const getSupplierByIdDispatch = async (
  request: GetSupplierByIdRequest
): Promise<ApiResponse<SupplierDetailsResponse>> => {
  const { id } = request;
  if (!id) {
    throw new Error("Id do fornecedor em formato incorreto.");
  }
  const response = await api.get(`/supplier/${id}`);
  return getApiResponse<any>(response.data, {} as SupplierDetailsResponse);
};
