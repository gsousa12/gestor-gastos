import { api } from "../../axios";

export const getUserInformation = async () => {
  const response = await api.get("/user/get-user-info/");
  return response.data;
};
