import { PaginationMeta } from '@common/structures/types';
import { SupplierEntity } from '@modules/supplier/core/domain/entities/supplier.entity';
import { Supplier } from '@prisma/client';

export interface ISupplierRepository {
  createSupplier(supplier: SupplierEntity): Promise<Supplier>;
  getSupplierList(
    page: number,
    limit: number,
    name: string | null,
    hasDebts: boolean | null,
  ): Promise<{ supplierList: Supplier[]; meta: PaginationMeta }>;
  getSupplierById(supplierId: number): Promise<Supplier | null>;
}
