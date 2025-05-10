export class PaymentEntity {
  id: number;
  mouth: number;
  year: string;
  amount: number;
  status: string;
  recurringDebtDeducted: number | null;
  createdAt: Date;
  updatedAt: Date | null;
  canceledAt: Date | null;
  supplierId: number;
  sectorId: number;
  expenseId: number;
}
