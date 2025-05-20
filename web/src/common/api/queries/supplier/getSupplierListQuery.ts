import { useQuery } from "@tanstack/react-query";
import {
  GetSupplierListRequest,
  Supplier,
} from "../../interfaces/supplier/supplier-api-interfaces";
import { ApiResponse } from "../../interfaces/api-response";
import { getSupplierListDispatch } from "../../dispatch/supplier/supplier-dispatch";

export const getSupplierListQuery = (request: GetSupplierListRequest) => {
  return useQuery<ApiResponse<Supplier[]>>({
    queryKey: ["supplierList", request],
    queryFn: () => getSupplierListDispatch(request),
  });
};
