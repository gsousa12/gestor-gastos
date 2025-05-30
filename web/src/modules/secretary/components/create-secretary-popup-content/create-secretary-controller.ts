import { createSecretaryMutation } from "@/common/api/mutations/secretary/createSecretaryMutation";

export const useCreateSecretaryController = () => {
  const { mutateAsync: createSecretaryMutate } = createSecretaryMutation();

  return {
    createSecretaryMutate,
  };
};
