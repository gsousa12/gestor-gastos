import { useNavigate } from "react-router-dom";
import { useAuthBootstrap } from "../../hooks/useAuthBoostrap";
import { useAuthStore } from "../../store/authStore";
import { useSessionExpiredPopupStore } from "../popups/session-expired-popup/session-expired-popup-manager";
import { BoostrapLoader } from "../global-loader/BoostrapLoader";
import { SessionExpiredPopup } from "../popups/session-expired-popup/SessionExpiredPopup";

export const AppController = ({ children }: { children: React.ReactNode }) => {
  const isBootstrapping = useAuthBootstrap();
  const open = useSessionExpiredPopupStore((s) => s.open);
  const hide = useSessionExpiredPopupStore((s) => s.hide);
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);

  const handleConfirm = () => {
    setUser(null);
    setAuthenticated(false);
    hide();
    navigate("/login", { replace: true });
  };

  if (isBootstrapping) {
    return <BoostrapLoader />;
  }

  return (
    <>
      <SessionExpiredPopup open={open} onConfirm={handleConfirm} />
      {children}
    </>
  );
};
