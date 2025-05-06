export class GetSupplierListResponseDto {
  id: number;
  name: string;
  companyName: string | null;
  taxId: string | null;
  recurringDebt: number;
  contactEmail: string | null;
  contactPhone: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}
