export class PaymentEntity {
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
  supplierName: string | null;
  sectorId: number;
  expenseId: number;
}
