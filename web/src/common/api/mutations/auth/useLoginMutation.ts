import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../../store/authStore";
import {
  getUserInformation,
  login,
  LoginRequest,
} from "../../dispatch/auth/auth";
import { useNavigate } from "react-router-dom";

export const useLoginMutation = () => {
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);
  const setUser = useAuthStore((s) => s.setUser);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (request: LoginRequest) => login(request),
    onSuccess: async () => {
      setAuthenticated(true);
      const user = await getUserInformation();
      setUser(user.data);
      navigate("/dashboard", { replace: true });
    },
    onError: () => {
      setAuthenticated(false);
      navigate("/login", { replace: true });
    },
  });
};
