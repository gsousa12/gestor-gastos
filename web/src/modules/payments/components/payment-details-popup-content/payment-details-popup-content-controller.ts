import {
  getPaymentDetailsQuery,
  PaymentDetailsResponse,
} from "@/common/api/queries/expenses/getPaymentDetailsQuery";

export const usePaymentDetailsController = (selectedId: number | null) => {
  const { data: paymentDetailsData } = getPaymentDetailsQuery({
    id: selectedId!,
  });

  return {
    paymentDetailsData:
      paymentDetailsData?.data || ({} as PaymentDetailsResponse),
  };
};
