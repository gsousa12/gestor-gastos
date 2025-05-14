import { api } from "../axios";

export interface LoginRequest {
  email: string;
  password: string;
}

export const login = async (request: LoginRequest) => {
  const response = await api.post("/auth/login/", request);
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/auth/logout/");
  return response.data;
};
