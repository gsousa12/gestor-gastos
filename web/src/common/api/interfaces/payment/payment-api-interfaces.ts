// Request
export interface GetPaymentListRequest {
  page: number;
  supplierName?: string;
  month?: number;
  year?: string;
}

export interface CreatePaymentRequest {
  amount: number;
  expenseId: number;
}

export interface CancelPaymentByIdRequest {
  id: number;
}
export interface GetPaymentDetailsRequest {
  id: number;
}
// Responses

// Others

export interface Payment {
  id: number;
  month: number;
  year: string;
  amount: number;
  status: string;
  recurringDebitDeducted: number | null;
  recurringDebitDeductedType: string | null;
  createdAt: string;
  updatedAt: string | null;
  cancelledAt: string | null;
  supplierId: number;
  supplierName: string;
  // sectorId: number;
  expenseId: number;
  expenseDesciption: string;
  expenseStatus: string;
  expenseAmount: number;
}
