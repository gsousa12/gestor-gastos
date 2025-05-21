import { useQuery } from "@tanstack/react-query";
import {
  GetSupplierByIdRequest,
  SupplierDetailsResponse,
} from "../../interfaces/supplier/supplier-api-interfaces";
import { ApiResponse } from "../../interfaces/api-response";
import { getSupplierByIdDispatch } from "../../dispatch/supplier/supplier-dispatch";

export const getSupplierByIdQuery = (request: GetSupplierByIdRequest) => {
  return useQuery<ApiResponse<SupplierDetailsResponse>>({
    queryKey: ["supplierById", request],
    queryFn: () => getSupplierByIdDispatch(request),
  });
};
