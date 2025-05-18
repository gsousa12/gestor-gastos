import { getDashboardDataEmpty } from "../../../../modules/dashboard/pages/dashboard-page-controller";
import { api } from "../../axios";
import { ApiResponse } from "../../interfaces/api-response";
import {
  GetDashboardData,
  GetDashboardDataRequest,
} from "../../interfaces/dashboard/dashboard-api-interfaces";
import { getApiResponse } from "../../interfaces/get-api-response";

export const getDashboardDataDispatch = async (
  request: GetDashboardDataRequest
): Promise<ApiResponse<GetDashboardData>> => {
  const { month } = request;
  const response = await api.get("/dashboard/", {
    params: { month },
  });
  return getApiResponse<GetDashboardData>(response.data, getDashboardDataEmpty);
};
