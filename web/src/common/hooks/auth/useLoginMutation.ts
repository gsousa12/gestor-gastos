import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../store/authStore";
import { login, LoginPayload } from "../../api/auth/auth";
import { useNavigate } from "react-router-dom";

export const useLoginMutation = () => {
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: () => {
      setAuthenticated(true); // (veja o próximo passo)
      navigate("/dashboard", { replace: true });
    },
    onError: () => {
      setAuthenticated(false);
    },
  });
};
