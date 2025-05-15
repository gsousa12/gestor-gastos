import { AppRoutes } from "./common/components/app-routes/AppRoutes";
import { Header } from "./common/components/header/Header";
import { Sidebar } from "./common/components/sidebar/Sidebar";
import { GlobalWrapper } from "./common/components/wrappers/global-wrapper/GlobalWrapper";
import { RightSideWrapper } from "./common/components/wrappers/right-side-wrapper/RightSideWrapper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "./common/store/authStore";
import { Route, Routes, useNavigate } from "react-router-dom";
import { LoginRoute } from "./modules/auth/components/login-route/LoginRoute";
import { Toaster } from "sonner";
import { GlobalLoader } from "./common/components/global-loader/GlobalLoader";
import { useAuthBootstrap } from "./common/hooks/useAuthBoostrap";
import { BoostrapLoader } from "./common/components/global-loader/BoostrapLoader";
import { SessionExpiredPopup } from "./common/components/popups/session-expired-popup/SessionExpiredPopup";
import { useSessionExpiredPopupStore } from "./common/components/popups/session-expired-popup/session-expired-popup-manager";

const queryClient = new QueryClient();

const AppLayout = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
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
    return (
      <>
        <BoostrapLoader />
      </>
    );
  }
  return (
    <GlobalWrapper>
      {isAuthenticated && (
        <>
          <SessionExpiredPopup open={open} onConfirm={handleConfirm} />
          <GlobalLoader />
          <Toaster richColors />
          <Sidebar />
          <RightSideWrapper>
            <Header />
            <AppRoutes />
          </RightSideWrapper>
        </>
      )}
      {!isAuthenticated && (
        <div className="h-screen">
          <Routes>
            <Route path="/login" element={<LoginRoute />} />
          </Routes>
        </div>
      )}
    </GlobalWrapper>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout />;
    </QueryClientProvider>
  );
};

export default App;
