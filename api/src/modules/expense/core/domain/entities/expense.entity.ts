// <-- MUDANÇA: Definindo a entidade do item da despesa para incluir os novos campos
export class ExpenseItemEntity {
  id?: number;
  name: string;
  description?: string | null;
  ci?: number; // <-- MUDANÇA
  quantity: number;
  unitValue: number;
  unitOfMeasure: string; // <-- MUDANÇA
}

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

  items: ExpenseItemEntity[]; // <-- MUDANÇA: Agora usa a entidade definida acima
}
