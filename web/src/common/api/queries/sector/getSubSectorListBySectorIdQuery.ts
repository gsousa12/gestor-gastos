import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../../interfaces/api-response";
import { getSubSectorListBySectorIdDispatch } from "../../dispatch/sector/sector-dispatch";

export interface GetSubSectorListBySectorIdRequest {
  id: number;
}

export interface SubSector {
  id: number;
  name: string;
}

export type GetSubSectorListBySectorIdResponse = Pick<SubSector, "id" | "name">;

export const getSubSectorListBySectorIdQuery = (
  request: GetSubSectorListBySectorIdRequest,
  options?: { enabled?: boolean }
) => {
  return useQuery<ApiResponse<GetSubSectorListBySectorIdResponse[]>>({
    queryKey: ["subSectorList", request],
    queryFn: () => getSubSectorListBySectorIdDispatch(request),
    enabled: options?.enabled,
  });
};
