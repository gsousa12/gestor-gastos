import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../../interfaces/api-response";
import { Secretary } from "@/modules/secretary/components/secretariats-details-cards-tile/SecretariatsDetailsCardsTile";
import { getSecretariatsListDispatch } from "../../dispatch/secretary/secretary-dispatch";

export interface GetSecretariatsListRequest {
  page: number;
}

export const getSecretariatsListQuery = (
  request: GetSecretariatsListRequest
) => {
  return useQuery<ApiResponse<Secretary[]>>({
    queryKey: ["secretariatsList", request],
    queryFn: () => getSecretariatsListDispatch(request),
  });
};
