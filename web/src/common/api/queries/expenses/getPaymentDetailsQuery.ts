import { useQuery } from "@tanstack/react-query";
import {
  GetPaymentDetailsRequest,
  Payment,
} from "../../interfaces/payment/payment-api-interfaces";
import { ApiResponse } from "../../interfaces/api-response";
import { Supplier } from "../../interfaces/supplier/supplier-api-interfaces";
import { Expense } from "../../interfaces/expense/expense-api-interfaces";
import { getPaymentDetailsDispatch } from "../../dispatch/payment/payment-dispatch";

export type PaymentDetailsResponse = Pick<
  Payment,
  | "month"
  | "year"
  | "amount"
  | "status"
  | "recurringDebitDeducted"
  | "recurringDebitDeductedType"
  | "createdAt"
  | "cancelledAt"
  | "supplierId"
  | "expenseId"
> & {
  expense: Pick<Expense, "description" | "amount" | "status">;
  supplier: Pick<Supplier, "name" | "companyName" | "recurringDebit">;
};

export const getPaymentDetailsQuery = (request: GetPaymentDetailsRequest) => {
  return useQuery<ApiResponse<PaymentDetailsResponse>>({
    queryKey: ["paymentDetails", request],
    queryFn: () => getPaymentDetailsDispatch(request),
  });
};
