export class CreateSupplierRequestDto {
  name: string;
  companyName: string | null;
  taxId: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
}
