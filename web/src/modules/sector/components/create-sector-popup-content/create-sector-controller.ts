import { createSectorMutation } from "@/common/api/mutations/sector/createSectorMutation";

export const useCreateSectorController = () => {
  const { mutateAsync: createSectorMutate } = createSectorMutation();

  return { createSectorMutate };
};
