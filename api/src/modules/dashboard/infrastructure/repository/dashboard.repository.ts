import { PrismaService } from '@common/modules/prisma/service/prisma.service';
import { Injectable } from '@nestjs/common';
import { IDashboardRepository } from '../interfaces/dashboard-repository.interface';
import { DashboardData, PaginationMeta } from '@common/structures/types';
import { PaymentStatus } from '@modules/payment/core/domain/enums/payment.enum';

@Injectable()
export class DashboardRepository implements IDashboardRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardData(
    month: number,
    year: string,
    userId?: number, // <-- MUDANÇA: userId agora é opcional
  ): Promise<{
    dashboardData: DashboardData[];
  }> {
    const numericYear = Number(year);
    const startDate = new Date(numericYear, month - 1, 1);
    const endDate = new Date(numericYear, month, 0, 23, 59, 59, 999);

    // ... (consultas 1, 2 e 3 não mudam) ...
    // 1. Active suppliers
    const activeSuppliers = await this.prisma.supplier.count({
      where: { deletedAt: null },
    });

    // 2. Expenses month somatory
    const expensesAggregate = await this.prisma.expense.aggregate({
      _sum: { amount: true },
      where: { createdAt: { gte: startDate, lte: endDate } },
    });

    // 3. Payments month somatory
    const paymentsAggregate = await this.prisma.payment.aggregate({
      _sum: { amount: true },
      where: {
        status: { not: PaymentStatus.CANCELED },
        createdAt: { gte: startDate, lte: endDate },
      },
    });

    // 4. Last expenses (with supplier name)
    const lastExpensesRaw = await this.prisma.expense.findMany({
      // MUDANÇA: O filtro de userId é aplicado condicionalmente.
      // Se `userId` for `undefined`, o Prisma ignora essa condição.
      // Se `userId` tiver um valor, o filtro `where: { userId: ... }` é aplicado.
      where: {
        userId: userId,
      },
      orderBy: { createdAt: 'desc' },
      take: 6,
      include: {
        supplier: {
          select: {
            name: true,
          },
        },
      },
    });

    const lastExpenses = lastExpensesRaw.map((expense) => ({
      id: expense.id,
      supplierName: expense.supplier.name,
      description: expense.description,
      amount: expense.amount,
      date: expense.createdAt,
    }));

    // 5. Top 5 suppliers by recurringDebit (não muda)
    const supplierWithMostDebits = await this.prisma.supplier.findMany({
      orderBy: { recurringDebit: 'desc' },
      take: 5,
      select: { id: true, name: true, recurringDebit: true },
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
