import { useEffect, useState } from "react";
import { useAuthStore } from "../store/auth/authStore";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserInformation } from "../api/dispatch/user/user-dispatch";

export function useAuthBootstrap() {
  const setUser = useAuthStore((s) => s.setUser);
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const isInLoginPage = location.pathname === "/login";

  useEffect(() => {
    if (!useAuthStore.getState().user && !isInLoginPage) {
      getUserInformation()
        .then((user) => {
          setUser(user.data);
          setAuthenticated(true);
          if (location.pathname === "/") {
            navigate("/dashboard", { replace: true });
          }
        })
        .catch(() => {
          setAuthenticated(false);
          if (location.pathname !== "/login") {
            navigate("/login", { replace: true });
          }
        })
        .finally(() => {
          setIsBootstrapping(false);
        });
    } else {
      setIsBootstrapping(false);
    }
  }, [setUser, setAuthenticated, navigate, location]);

  return isBootstrapping;
}
