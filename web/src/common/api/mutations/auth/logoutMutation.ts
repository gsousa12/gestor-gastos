import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../../store/authStore";
import { logoutDispatch } from "../../dispatch/auth/auth";
import { ApiResponse } from "../../interfaces/api-response";

export const logoutMutation = () => {
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);
  const navigate = useNavigate();
  return useMutation<ApiResponse<{}>>({
    mutationFn: () => logoutDispatch(),
    onSuccess: () => {
      setAuthenticated(false);
      navigate("/login", { replace: true });
    },
    onError: () => {},
  });
};
