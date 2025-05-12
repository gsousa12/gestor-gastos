import { Supplier } from '@prisma/client';
import { SupplierEntity } from '../../domain/entities/supplier.entity';
import { PaginationMeta } from '@common/structures/types';

export interface ISupplierService {
  // Creates
  createSupplier(supplier: SupplierEntity): Promise<Supplier>;

  // Gets
  getSupplierList(
    page: number,
    limit: number,
    name: string | null,
    hasDebits: boolean | null,
  ): Promise<{ supplierList: Supplier[] | []; meta: PaginationMeta }>;
  getSupplierById(supplierId: number): Promise<Supplier>;
}
