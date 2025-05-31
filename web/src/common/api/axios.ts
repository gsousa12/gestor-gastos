import axios from "axios";
import { env } from "../configurations/env";
import { showSessionExpiredPopup } from "../components/popups/session-expired-popup/session-expired-popup-manager";
import { useAuthStore } from "../store/auth/authStore";

export const api = axios.create({
  baseURL: env.API_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      useAuthStore.getState().isAuthenticated
    ) {
      showSessionExpiredPopup();
    }
    return Promise.reject(error);
  }
);
