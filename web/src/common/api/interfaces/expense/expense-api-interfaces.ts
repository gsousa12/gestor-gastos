// Request
export interface GetExpenseListRequest {
  page: number;
  supplierName?: string;
  month?: number;
  year?: string;
}

// Response

export interface CreateExpenseFormData {
  supplierList: { id: number; name: string }[];
  secretaryList: { id: number; name: string }[];
  subSectorList: { id: number; name: string }[];
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
