import { SUPPLIER_REPOSITORY } from '@common/tokens/repositories.tokens';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ISupplierService } from '../interfaces/supplier-service.interface';
import { SupplierRepository } from '@modules/supplier/infrastructure/repositories/supplier.repository';
import { SupplierHelper } from '../helpers/supplier.helper';
import { Supplier } from '@prisma/client';
import { SupplierEntity } from '../../domain/entities/supplier.entity';
import { PaginationMeta } from '@common/structures/types';

@Injectable()
export class SupplierService implements ISupplierService {
  constructor(
    @Inject(SUPPLIER_REPOSITORY) private readonly supplierRepository: SupplierRepository,
    private readonly supplierHelper: SupplierHelper,
  ) {}

  async createSupplier(supplier: SupplierEntity): Promise<Supplier> {
    const createdSupplier = await this.supplierRepository.createSupplier(supplier);
    return createdSupplier;
  }

  async getSupplierList(
    page: number,
    limit: number,
    name: string | null,
    hasDebits: boolean | null,
  ): Promise<{ supplierList: Supplier[] | []; meta: PaginationMeta }> {
    const { supplierList: supplierList, meta } = await this.supplierRepository.getSupplierList(
      page,
      limit,
      name,
      hasDebits,
    );

    return !supplierList || supplierList.length === 0
      ? { supplierList: [], meta }
      : {
          supplierList,
          meta,
        };
  }

  async getSupplierById(supplierId: number): Promise<Supplier> {
    const supplier = await this.supplierRepository.getSupplierById(supplierId);

    if (!supplier) {
      throw new NotFoundException('Fornecedor não encontrado.');
    }

    return supplier;
  }
}
