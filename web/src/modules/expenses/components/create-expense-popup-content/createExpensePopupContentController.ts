import { useEffect } from "react";
import { useGetCreateExpenseFormData } from "../../../../common/hooks/expense/useGetCreateExpenseFormData";

export const useCreateExpensePopupContentController = () => {
  const { mutate, data, isPending } = useGetCreateExpenseFormData();
  useEffect(() => {
    mutate();
  }, []);
  return { createExpenseFormData: data?.data, isPending };
};
