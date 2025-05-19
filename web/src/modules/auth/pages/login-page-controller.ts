import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@common/store/authStore";

import { showToast } from "@common/components/toast/Toast";
import { loginMutation } from "@common/api/mutations/auth/loginMutation";
import { getUserInformation } from "@/common/api/dispatch/user/user-dispatch";

export const useLoginPageController = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);
  const setUser = useAuthStore((s) => s.setUser);

  const { mutate: loginMutate, isPending, isError, error } = loginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutate(
      { email, password },
      {
        onSuccess: async () => {
          setAuthenticated(true);
          const user = await getUserInformation();
          setUser(user.data);
          navigate("/dashboard", { replace: true });
        },
        onError: (error: any) => {
          setAuthenticated(false);
          setPassword("");
          const errorMessage = error?.response?.data?.message;
          if (errorMessage) {
            showToast({
              title: "Erro ao efetuar login!",
              description: `${errorMessage}`,
              type: "error",
            });
          }
          if (window.location.pathname !== "/login") {
            navigate("/login", { replace: true });
          }
        },
      }
    );
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    isPending,
    isError,
    error,
  };
};
