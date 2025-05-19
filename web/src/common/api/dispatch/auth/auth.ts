import { api } from "../../axios";
import { ApiResponse } from "../../interfaces/api-response";
import { LoginRequest } from "../../interfaces/auth/auth-api-interfaces";
import { getApiResponse } from "../../interfaces/get-api-response";

export const loginDispatch = async (
  request: LoginRequest
): Promise<ApiResponse<{}>> => {
  const response = await api.post("/auth/login/", request);
  return getApiResponse<{}>(response.data, {});
};

export const logoutDispatch = async (): Promise<ApiResponse<{}>> => {
  const response = await api.post("/auth/logout/");
  return getApiResponse<{}>(response.data, {});
};
