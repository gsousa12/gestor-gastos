import { useEffect } from "react";
import { useGetCreateExpenseFormData } from "../../../../common/api/mutations/expense/useGetCreateExpenseFormData";

export const useCreateExpensePopupContentController = () => {
  const { mutate, data, isPending } = useGetCreateExpenseFormData();
  useEffect(() => {
    mutate();
  }, []);
  return { createExpenseFormData: data?.data, isPending };
};
