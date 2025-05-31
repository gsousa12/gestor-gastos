import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../../store/auth/authStore";
import { logoutDispatch } from "../../dispatch/auth/auth";
import { ApiResponse } from "../../interfaces/api-response";
import { showToast } from "@/common/components/toast/Toast";
import { getErrorMessage } from "@/common/utils/functions";

export const logoutMutation = () => {
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);
  const navigate = useNavigate();
  return useMutation<ApiResponse<{}>>({
    mutationFn: () => logoutDispatch(),
    onSuccess: () => {
      setAuthenticated(false);
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      showToast({
        title: "Erro ao efetuar logout",
        description: getErrorMessage(error),
        type: "error",
      });
    },
  });
};
