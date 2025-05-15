import { logout } from "../../dispatch/auth/auth";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../../store/authStore";

export const useLogoutMutation = () => {
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      setAuthenticated(false);
      navigate("/login", { replace: true });
    },
    onError: () => {},
  });
};
