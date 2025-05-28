import { createExpenseMutation } from "@/common/api/mutations/expense/createExpenseMutation";
import { createPaymentMutation } from "@/common/api/mutations/payment/createPaymentMutation";
import { getExpenseDetailsQuery } from "@/common/api/queries/expenses/getExpenseDetailsQuery";

export const useRegisterExpensePaymentController = (
  selectedId: number | null
) => {
  const { data: expenseDetails } = getExpenseDetailsQuery(
    { id: selectedId! },
    {
      enabled: selectedId !== null,
    }
  );

  const {
    mutateAsync: createPaymentMutate,
    isSuccess: createPaymentMutateIsSucess,
  } = createPaymentMutation();

  return {
    expenseDetailsData: expenseDetails?.data,
    createPaymentMutate,
    createPaymentMutateIsSucess,
  };
};
