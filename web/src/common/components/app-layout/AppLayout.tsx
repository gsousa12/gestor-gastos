import { Route, Routes } from "react-router-dom";
import { Toaster } from "../ui/sonner";
import { useAuthStore } from "../../store/auth/authStore";
import { AppRoutes } from "../app-routes/AppRoutes";
import { GlobalLoader } from "../global-loader/GlobalLoader";
import { Header } from "../header/Header";
import { Sidebar } from "../sidebar/Sidebar";
import { GlobalWrapper } from "../wrappers/global-wrapper/GlobalWrapper";
import { RightSideWrapper } from "../wrappers/right-side-wrapper/RightSideWrapper";
import { LoginRoute } from "@modules/auth/components/login-route/LoginRoute";

export const AppLayout = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <GlobalWrapper>
      <GlobalLoader />
      <Toaster richColors />
      {isAuthenticated ? (
        <>
          <Sidebar />
          <RightSideWrapper>
            <Header />
            <AppRoutes />
          </RightSideWrapper>
        </>
      ) : (
        <div className="h-screen">
          <Routes>
            <Route path="/login" element={<LoginRoute />} />
          </Routes>
        </div>
      )}
    </GlobalWrapper>
  );
};
