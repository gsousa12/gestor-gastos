export const useRegisterExpensePaymentController = () => {
  const { data: expenseDetails } = getExpenseDetailsQuery();
  return {
    registerPaymentData: null,
  };
};
