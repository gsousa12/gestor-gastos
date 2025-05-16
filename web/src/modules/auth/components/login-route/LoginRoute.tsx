import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../../../common/store/authStore";
import { LoginPage } from "../../pages/LoginPage";
import { useEffect } from "react";
import { useSessionExpiredPopupStore } from "../../../../common/components/popups/session-expired-popup/session-expired-popup-manager";

export const LoginRoute = () => {
  const hide = useSessionExpiredPopupStore((s) => s.hide);

  useEffect(() => {
    hide();
  }, [hide]);

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return <LoginPage />;
};
