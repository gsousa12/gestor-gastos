import { AppRoutes } from "./common/components/app-routes/AppRoutes";
import { Header } from "./common/components/header/Header";
import { Sidebar } from "./common/components/sidebar/Sidebar";
import { GlobalWrapper } from "./common/components/wrappers/global-wrapper/GlobalWrapper";
import { RightSideWrapper } from "./common/components/wrappers/right-side-wrapper/RightSideWrapper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "./common/store/authStore";
import { Route, Routes } from "react-router-dom";
import { LoginRoute } from "./modules/auth/components/login-route/LoginRoute";

const queryClient = new QueryClient();

const AppLayout = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return (
    <GlobalWrapper>
      {isAuthenticated && (
        <>
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
