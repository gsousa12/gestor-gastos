import { Secretary } from "@/modules/secretary/components/secretariats-details-cards-tile/SecretariatsDetailsCardsTile";
import { ApiResponse } from "../../interfaces/api-response";
import { GetSecretariatsListRequest } from "../../queries/secretary/getSecretariatsListQuery";
import { api } from "../../axios";
import { getApiResponse } from "../../interfaces/get-api-response";

export const getSecretariatsListDispatch = async (
  request: GetSecretariatsListRequest
): Promise<ApiResponse<Secretary[]>> => {
  const { page } = request;

  const response = await api.get("/secretary/", {
    params: {
      page,
    },
  });

  return getApiResponse<Secretary[]>(response.data, []);
};
