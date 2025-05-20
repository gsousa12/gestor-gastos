export interface GetSupplierListRequest {
  page: number;
  name?: string;
  has_debits?: string;
}

export interface Supplier {
  id: number;
  name: string;
  companyName: string;
  recurringDebit: number;
  taxId: string;
  contactEmail: string;
  contactPhone: string;
  createdAt: string;
  updatedAt: string | null;
}
