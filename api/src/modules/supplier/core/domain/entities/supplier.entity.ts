export class SupplierEntity {
  id: number;
  name: string;
  companyName: string | null;
  recurringDebit: number;
  taxId: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}
