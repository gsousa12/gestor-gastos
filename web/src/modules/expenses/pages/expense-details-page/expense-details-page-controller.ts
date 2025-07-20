import { getExpenseDetailsQuery } from "@/common/api/queries/expenses/getExpenseDetailsQuery";
import { useLocation } from "react-router-dom";

export const useExpenseDetailsPageController = () => {
  const location = useLocation();
  const { expenseId } = location.state || {};
  const { data, isPending, isError } = getExpenseDetailsQuery(
    { id: expenseId! },
    {
      enabled: expenseId !== null,
    }
  );
  return {
    expenseDetailsData: data?.data,
    isPending,
    isError: isError || expenseId === null,
  };
};
