// Request
export interface GetExpenseListRequest {
  page: number;
  supplierName?: string;
  month?: number;
  year?: string;
}

export interface GetExpenseDetailsRequest {
  id: number;
}

export interface ExpenseItemRequest {
  id: number | null; // sempre null por enquanto
  name: string;
  quantity: number;
  unitValue: number;
}

export interface CreateExpenseRequest {
  description: string | null;
  month: number;
  year: string;
  supplierId: number;
  secretaryId: number;
  userId: number;
  subsectorId: number;
  items: ExpenseItemRequest[];
}

export interface DeleteExpenseByIdRequest {
  id: number;
}

// Response

export interface CreateExpenseFormData {
  supplierList: CreateExpenseFormListContent[];
  secretaryList: CreateExpenseFormListContent[];
  subSectorList: CreateExpenseFormListContent[];
  itemList: CreateExpenseItemListContent[];
}

// Others

export type Expense = {
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
  createdAt: string;
  supplierName: string;
  subsectorName: string;
};

interface CreateExpenseFormListContent {
  id: number;
  name: string;
}

interface CreateExpenseItemListContent {
  id: number;
  name: string;
  description?: string | null;
}
