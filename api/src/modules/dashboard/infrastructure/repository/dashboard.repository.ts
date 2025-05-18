import { PrismaService } from '@common/modules/prisma/service/prisma.service';
import { Injectable } from '@nestjs/common';
import { IDashboardRepository } from '../interfaces/dashboard-repository.interface';
import { DashboardData, PaginationMeta } from '@common/structures/types';

@Injectable()
export class DashboardRepository implements IDashboardRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardData(month: number): Promise<{
    dashboardData: DashboardData[];
  }> {
    const now = new Date();
    const year = now.getFullYear();
    const startDate = new Date(`${year}-${String(month).padStart(2, '0')}-01`);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999); // último dia do mês

    // 1. Active suppliers
    const activeSuppliers = await this.prisma.supplier.count({
      where: { deletedAt: null },
    });

    // 2. Expenses month somatory
    const expensesAggregate = await this.prisma.expense.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    // 3. Payments month somatory
    const paymentsAggregate = await this.prisma.payment.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    // 4. Last 4 expenses (with supplier name)
    const lastExpensesRaw = await this.prisma.expense.findMany({
      orderBy: { createdAt: 'desc' },
      take: 4,
      include: {
        supplier: {
          select: {
            name: true,
          },
        },
      },
    });

    // Mapeia os dados para incluir supplierName diretamente no objeto
    const lastExpenses = lastExpensesRaw.map((expense) => ({
      id: expense.id,
      supplierName: expense.supplier.name,
      description: expense.description,
      amount: expense.amount,
      date: expense.createdAt,
    }));

    // 5. Top 5 suppliers by recurringDebit
    const supplierWithMostDebits = await this.prisma.supplier.findMany({
      orderBy: {
        recurringDebit: 'desc',
      },
      take: 5,
      select: {
        id: true,
        name: true,
        recurringDebit: true,
      },
    });

    const dashboardData: DashboardData = {
      activeSuppliers,
      expensesMonthSomatory: expensesAggregate._sum.amount ?? 0,
      paymentsMonthSomatory: paymentsAggregate._sum.amount ?? 0,
      lastExpenses,
      supplierWithMostDebits,
    };

    return {
      dashboardData: [dashboardData],
    };
  }
}
