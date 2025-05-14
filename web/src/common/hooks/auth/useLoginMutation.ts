import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../store/authStore";
import { login, LoginRequest } from "../../api/auth/auth";
import { useNavigate } from "react-router-dom";

export const useLoginMutation = () => {
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (request: LoginRequest) => login(request),
    onSuccess: () => {
      setAuthenticated(true);
      navigate("/dashboard", { replace: true });
    },
    onError: () => {
      setAuthenticated(false);
    },
  });
};
