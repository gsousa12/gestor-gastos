import axios from "axios";
import { env } from "../configurations/env";
import { showSessionExpiredPopup } from "../components/popups/session-expired-popup/session-expired-popup-manager";

export const api = axios.create({
  baseURL: env.API_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      showSessionExpiredPopup();
    }
    return Promise.reject(error);
  }
);
