import { api } from "../../axios";
import { ApiResponse } from "../../interfaces/api-response";
import { getApiResponse } from "../../interfaces/get-api-response";
import {
  CreateSupplierRequest,
  GetSupplierByIdRequest,
  GetSupplierListRequest,
  SoftDeleteSupplierByIdRequest,
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

export const createSupplierDispatch = async (
  request: CreateSupplierRequest
): Promise<ApiResponse<null>> => {
  const response = await api.post("/supplier/", request);
  return getApiResponse<null>(response.data, null);
};

export const softDeleteSupplierByIdDispatch = async (
  request: SoftDeleteSupplierByIdRequest
): Promise<ApiResponse<null>> => {
  try {
    const { id } = request;
    const response = await api.delete(`/supplier/soft-delete/${id}`);
    return getApiResponse<null>(response.data, null);
  } catch (error) {
    throw error;
  }
};
