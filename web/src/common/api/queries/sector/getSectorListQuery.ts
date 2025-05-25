import { Sector } from "@/modules/sector/components/sectors-details-cards-tile/SectorsDetailsCardsTile";
import { ApiResponse } from "../../interfaces/api-response";
import { useQuery } from "@tanstack/react-query";
import { getSectorListDispatch } from "../../dispatch/sector/sector-dispatch";

export type GetSectorListRequest = {
  page: number;
  name?: string;
};

export const getSectorListQuery = (request: GetSectorListRequest) => {
  return useQuery<ApiResponse<Sector[]>>({
    queryKey: ["sectorList", request],
    queryFn: () => getSectorListDispatch(request),
  });
};
