import { SUPPLIER_REPOSITORY } from '@common/tokens/repositories.tokens';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ISupplierService } from '../interfaces/supplier-service.interface';
import { SupplierRepository } from '@modules/supplier/infrastructure/repositories/supplier.repository';
import { SupplierHelper } from '../helpers/supplier.helper';
import { Supplier } from '@prisma/client';
import { SupplierEntity } from '../../domain/entities/supplier.entity';
import { PaginationMeta } from '@common/structures/types';
import { getCurrentMonth, getCurrentYear } from '@common/utils/data-functions';

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

  async getSupplierDetails(supplierId: number) {
    if (!supplierId) {
      throw new BadRequestException('Id do fornecedor em formato incorreto.');
    }
    const supplier = await this.getSupplierById(supplierId);

    const [recentExpenses, payments, totalPaidThisMonth, totalPendingExpenses, paymentHistoryByMonth] =
      await Promise.all([
        this.supplierRepository.getRecentExpensesBySupplierId(supplierId, 5),
        this.supplierRepository.getPaymentsBySupplierId(supplierId),
        this.supplierRepository.getTotalPaidThisMonth(supplierId, getCurrentMonth(), getCurrentYear()),
        this.supplierRepository.getTotalPendingExpenses(supplierId),
        this.supplierRepository.getPaymentHistoryByMonth(supplierId, 6),
      ]);

    return {
      supplierInformation: supplier,
      financialSummary: {
        totalPaidThisMonth,
        totalPendingExpenses,
        paymentHistoryByMonth: paymentHistoryByMonth.map((payment) => ({
          month: payment.month,
          year: payment.year,
          totalPaid: payment._sum.amount,
        })),
      },
      recentExpenses,
      paymentHistory: payments,
    };
  }
}
