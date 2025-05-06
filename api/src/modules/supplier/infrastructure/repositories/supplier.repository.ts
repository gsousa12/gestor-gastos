import { PrismaService } from '@common/modules/prisma/service/prisma.service';
import { Injectable } from '@nestjs/common';
import { ISupplierRepository } from '../interfaces/supplier-rerpository.interface';
import { Supplier } from '@prisma/client';
import { SupplierEntity } from '@modules/supplier/core/domain/entities/supplier.entity';
import { PaginationMeta } from '@common/structures/types';

@Injectable()
export class SupplierRepository implements ISupplierRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createSupplier(supplier: SupplierEntity): Promise<Supplier> {
    const createdSupplier = await this.prisma.supplier.create({
      data: {
        name: supplier.name,
        companyName: supplier.companyName,
        taxId: supplier.taxId,
        recurringDebit: 0,
        contactEmail: supplier.contactEmail,
        contactPhone: supplier.contactPhone,
        createdAt: new Date(),
      },
    });

    return createdSupplier;
  }

  async getSupplierList(
    page: number,
    limit: number,
    name: string | null,
    hasDebits: boolean | null,
  ): Promise<{ supplierList: Supplier[]; meta: PaginationMeta }> {
    const skip = (page - 1) * limit;

    const whereClause: any = {
      deletedAt: null,
    };

    if (name) {
      whereClause.name = { contains: name, mode: 'insensitive' };
    }

    if (hasDebits !== null) {
      if (hasDebits === true) {
        whereClause.recurringDebit = { gt: 0 };
      } else {
        whereClause.recurringDebit = { lte: 0 };
      }
    }

    const [supplierList, totalCount] = await Promise.all([
      this.prisma.supplier.findMany({
        where: whereClause,
        skip,
        take: limit,
      }),
      this.prisma.supplier.count({
        where: whereClause,
      }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      supplierList: supplierList,
      meta: {
        totalItems: totalCount,
        itemsPerPage: limit,
        currentPage: page,
        totalPages,
      },
    };
  }
  async getSupplierById(supplierId: number): Promise<Supplier | null> {
    const supplier = await this.prisma.supplier.findUnique({
      where: { id: supplierId, deletedAt: null },
    });

    return supplier;
  }
}
