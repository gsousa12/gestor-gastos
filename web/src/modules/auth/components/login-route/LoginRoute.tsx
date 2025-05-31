import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/common/store/auth/authStore";
import { LoginPage } from "../../pages/LoginPage";
import { useEffect } from "react";
import { useSessionExpiredPopupStore } from "@components/popups/session-expired-popup/session-expired-popup-manager";

export const LoginRoute = () => {
  const hide = useSessionExpiredPopupStore((s) => s.hide);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    hide();
  }, [hide]);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return <LoginPage />;
};
