import { useQuery } from "@tanstack/react-query";
import {
  GetDashboardData,
  GetDashboardDataRequest,
} from "../../interfaces/dashboard/dashboard-api-interfaces";
import { getDashboardDataDispatch } from "../../dispatch/dashboard/dashboard-dispatch";
import { ApiResponse } from "../../interfaces/api-response";

export const getDashboardDataQuery = (request: GetDashboardDataRequest) => {
  return useQuery<ApiResponse<GetDashboardData>>({
    queryKey: ["dashboardData", request],
    queryFn: () => getDashboardDataDispatch(request),
  });
};
