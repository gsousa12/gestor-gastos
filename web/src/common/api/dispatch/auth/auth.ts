import { api } from "../../axios";
import { LoginRequest } from "../../types/api-interfaces";

export const login = async (request: LoginRequest) => {
  const response = await api.post("/auth/login/", request);
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/auth/logout/");
  return response.data;
};

export const getUserInformation = async () => {
  const response = await api.get("/auth/get-user-info/");
  return response.data;
};
