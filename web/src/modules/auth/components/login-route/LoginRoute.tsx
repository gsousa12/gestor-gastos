import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../../../common/store/authStore";
import { LoginPage } from "../../pages/LoginPage";

export const LoginRoute = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  console.log(isAuthenticated + " LoginRoute");

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <LoginPage />;
};
