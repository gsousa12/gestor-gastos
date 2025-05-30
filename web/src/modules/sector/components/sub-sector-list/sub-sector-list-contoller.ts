import { createSubSectorMutation } from "@/common/api/mutations/sector/createSubSectorMutation";
import { softDeleteSubSectorByIdMutation } from "@/common/api/mutations/sector/softDeleteSubSectorByIdMutation";

export const useSubSectorListController = () => {
  const { mutateAsync: createSubSectorMutate } = createSubSectorMutation();
  const { mutateAsync: softDeleteSubSectorByIdMutate } =
    softDeleteSubSectorByIdMutation();
  return {
    createSubSectorMutate,
    softDeleteSubSectorByIdMutate,
  };
};
