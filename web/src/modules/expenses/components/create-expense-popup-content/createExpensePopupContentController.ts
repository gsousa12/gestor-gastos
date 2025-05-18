import { getCreateExpenseFormDataQuery } from "../../../../common/api/queries/expenses/getCreateExpenseFormDataQuery";

export const useCreateExpensePopupContentController = () => {
  const { data: createExpenseFormData, isPending } =
    getCreateExpenseFormDataQuery();

  return { createExpenseFormData: createExpenseFormData?.data, isPending };
};
