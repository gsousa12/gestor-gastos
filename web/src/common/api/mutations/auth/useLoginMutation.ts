import { useMutation } from "@tanstack/react-query";
import { LoginRequest } from "../../types/api-interfaces";
import { login } from "../../dispatch/auth/auth";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (request: LoginRequest) => login(request),
  });
};
