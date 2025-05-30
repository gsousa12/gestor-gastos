import { createSupplierMutation } from "@/common/api/mutations/supplier/createSupplierMutation";

export const useCreateSupplierController = () => {
  const {
    mutateAsync: createSupplierMutate,
    isSuccess: createSupplierIsSuccess,
  } = createSupplierMutation();

  return {
    createSupplierMutate,
    createSupplierIsSuccess,
  };
};
