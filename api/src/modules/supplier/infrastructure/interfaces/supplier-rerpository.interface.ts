import { PaginationMeta } from '@common/structures/types';
import { SupplierEntity } from '@modules/supplier/core/domain/entities/supplier.entity';
import { Supplier } from '@prisma/client';

export interface ISupplierRepository {
  // Creates
  createSupplier(supplier: SupplierEntity): Promise<Supplier>;

  // Gets
  getSupplierList(
    page: number,
    limit: number,
    name: string | null,
    hasDebits: boolean | null,
  ): Promise<{ supplierList: Supplier[]; meta: PaginationMeta }>;
  getSupplierById(supplierId: number): Promise<Supplier | null>;
}
