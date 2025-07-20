import { getCreateExpenseFormDataQuery } from "../../../../common/api/queries/expenses/getCreateExpenseFormDataQuery";

export const useCreateExpensePopupContentController = () => {
  const {
    data: createExpenseFormData,
    isPending,
    refetch,
  } = getCreateExpenseFormDataQuery();

  return {
    createExpenseFormData: createExpenseFormData?.data,
    isPending,
    refetchCreateExpenseFormDataQuery: refetch,
  };
};
