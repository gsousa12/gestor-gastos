import { Sector } from "@/modules/sector/components/sectors-details-cards-tile/SectorsDetailsCardsTile";
import { ApiResponse } from "../../interfaces/api-response";
import { useQuery } from "@tanstack/react-query";
import { getSectorByIdDispatch } from "../../dispatch/sector/sector-dispatch";

export interface GetSectorByIdRequest {
  id: number;
}

export const getSectorByIdQuery = (
  request: GetSectorByIdRequest,
  options?: { enabled?: boolean }
) => {
  return useQuery<ApiResponse<Sector>>({
    queryKey: ["sectorDetails", request],
    queryFn: () => getSectorByIdDispatch(request),
    enabled: options?.enabled,
  });
};
