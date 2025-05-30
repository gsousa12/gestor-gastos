import { PrismaService } from '@common/modules/prisma/service/prisma.service';
import { Injectable } from '@nestjs/common';
import { ISupplierRepository } from '../interfaces/supplier-rerpository.interface';
import { Supplier } from '@prisma/client';
import { SupplierEntity } from '@modules/supplier/core/domain/entities/supplier.entity';
import { PaginationMeta } from '@common/structures/types';
import { PaymentStatus } from '@modules/payment/core/domain/enums/payment.enum';
import { ExpenseStatus } from '@modules/expense/core/domain/enums/expense.enum';

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

  async getSupplierByName(name: string): Promise<Supplier | null> {
    return await this.prisma.supplier.findFirst({
      where: { name, deletedAt: null },
    });
  }

  async getRecentExpensesBySupplierId(supplierId: number, limit = 5) {
    return this.prisma.expense.findMany({
      where: { supplierId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  async getPaymentsBySupplierId(supplierId: number) {
    return this.prisma.payment.findMany({
      where: { supplierId },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });
  }

  async getTotalPaidThisMonth(supplierId: number, month: number, year: string) {
    const result = await this.prisma.payment.aggregate({
      _sum: { amount: true },
      where: {
        supplierId,
        month,
        year,
        status: PaymentStatus.ACTIVE,
      },
    });
    return result._sum.amount || 0;
  }

  async getTotalPendingExpenses(supplierId: number) {
    const result = await this.prisma.expense.aggregate({
      _sum: { amount: true },
      where: {
        supplierId,
        status: ExpenseStatus.PENDING,
      },
    });
    return result._sum.amount || 0;
  }

  async getPaymentHistoryByMonth(supplierId: number, monthsBack = 6) {
    return this.prisma.payment.groupBy({
      by: ['month', 'year'],
      where: { supplierId, status: PaymentStatus.ACTIVE },
      _sum: { amount: true },
      orderBy: [{ year: 'desc' }, { month: 'desc' }],
      take: monthsBack,
    });
  }

  async softDeleteSupplierById(supplierId: number): Promise<void> {
    await this.prisma.supplier.update({
      data: {
        deletedAt: new Date(),
      },
      where: {
        id: supplierId,
        deletedAt: null,
      },
    });
  }
}
