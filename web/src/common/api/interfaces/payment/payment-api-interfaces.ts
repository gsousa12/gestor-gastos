// Request
export interface GetPaymentListRequest {
  page: number;
  supplierName?: string;
  month?: number;
  year?: string;
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
  createdAt: Date;
  updatedAt: Date | null;
  canceledAt: Date | null;
  supplierId: number;
  supplierName: string;
  sectorId: number;
  expenseId: number;
}
