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

export interface CreateExpenseRequest {
  description: string | null;
  month: number;
  year: string;
  amount: number;
  supplierId: number;
  secretaryId: number;
  userId: number;
  subsectorId: number;
}

export interface DeleteExpenseByIdRequest {
  id: number;
}

// Response

export interface CreateExpenseFormData {
  supplierList: CreateExpenseFormListContent[];
  secretaryList: CreateExpenseFormListContent[];
  subSectorList: CreateExpenseFormListContent[];
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
