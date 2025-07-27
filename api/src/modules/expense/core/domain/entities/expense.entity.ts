export class ExpenseItemEntity {
  id?: number;
  name: string;
  description?: string | null;
  ci?: number;
  quantity: number;
  unitOfMeasure: string;
  unitValue: number | null; // <-- MUDANÇA CRÍTICA: Agora aceita null
  totalValue: number;
}

// A ExpenseEntity principal não precisa de mudanças
export class ExpenseEntity {
  id: number;
  description: string | null;
  month: number;
  year: string;
  amount: number;
  status: string;
  supplierId: number;
  secretaryId: number;
  userId: number;
  subsectorId: number;
  createdAt: Date;
  supplierName: string | null;

  items: ExpenseItemEntity[];
}
