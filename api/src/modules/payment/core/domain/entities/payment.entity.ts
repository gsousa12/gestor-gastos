export class PaymentEntity {
  id: number;
  mouth: number;
  year: string;
  amount: number;
  status: string;
  recurringDebitDeducted: number | null;
  createdAt: Date;
  updatedAt: Date | null;
  canceledAt: Date | null;
  supplierId: number;
  supplierName: string | null;
  sectorId: number;
  expenseId: number;
}
