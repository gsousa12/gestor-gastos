import { Sector } from "@/modules/sector/components/sectors-details-cards-tile/SectorsDetailsCardsTile";
import { ApiResponse } from "../../interfaces/api-response";
import { api } from "../../axios";
import { getApiResponse } from "../../interfaces/get-api-response";
import { GetSectorListRequest } from "../../queries/sector/getSectorListQuery";

export const getSectorListDispatch = async (
  request: GetSectorListRequest
): Promise<ApiResponse<Sector[]>> => {
  const { page, name } = request;

  const response = await api.get("/sector/", {
    params: {
      page,
      name,
    },
  });

  return getApiResponse<Sector[]>(response.data, []);
};
