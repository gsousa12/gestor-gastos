export interface GetSupplierListRequest {
  page: number;
  name?: string;
  has_debits?: string;
}

export interface Supplier {
  id: number;
  name: string;
  companyName: string | null;
  recurringDebit: number;
  taxId: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  createdAt: string;
  updatedAt: string | null;
}
