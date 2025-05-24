import { PrismaService } from '@common/modules/prisma/service/prisma.service';
import { Injectable } from '@nestjs/common';
import { IExpenseRepository } from '../interfaces/expense-repository.interface';
import { ExpenseEntity } from '@modules/expense/core/domain/entities/expense.entity';
import { Expense, Secretary, Sector, SubSector, Supplier } from '@prisma/client';
import { PaginationMeta } from '@common/structures/types';
import { ExpenseStatus } from '@modules/expense/core/domain/enums/expense.enum';

@Injectable()
export class ExpenseRepository implements IExpenseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createExpense(expense: ExpenseEntity): Promise<Expense> {
    return await this.prisma.expense.create({
      data: {
        description: expense.description,
        month: expense.month,
        year: expense.year,
        amount: expense.amount,
        status: ExpenseStatus.PENDING,
        createdAt: new Date(),
        supplierId: expense.supplierId,
        secretaryId: expense.secretaryId,
        userId: expense.userId,
        subsectorId: expense.subsectorId,
      },
    });
  }

  async verifyExistence(expense: ExpenseEntity): Promise<{ verifyExistence: boolean; message: string }> {
    const { userId, supplierId, secretaryId, subsectorId } = expense;

    const [user, supplier, secretary, subsector] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: userId } }),
      this.prisma.supplier.findUnique({ where: { id: supplierId } }),
      this.prisma.secretary.findUnique({ where: { id: secretaryId } }),
      this.prisma.subSector.findUnique({ where: { id: subsectorId } }),
    ]);

    if (!user) return { verifyExistence: false, message: 'Usuário não encontrado' };
    if (!supplier) return { verifyExistence: false, message: 'Fornecedor não encontrado' };
    if (!subsector) return { verifyExistence: false, message: 'Subsetor não encontrado' };
    if (!secretary) return { verifyExistence: false, message: 'Secretaria não encontrada' };

    return { verifyExistence: true, message: 'Todos os dados existem' };
  }

  async getExpenseList(
    page: number,
    limit: number,
    supplierName?: string,
    month?: number,
    year?: string,
  ): Promise<{ expenseList: Expense[]; meta: PaginationMeta }> {
    const skip = (page - 1) * limit;

    const whereClause: any = {};

    if (supplierName) {
      whereClause.supplier = {
        name: {
          contains: supplierName,
          mode: 'insensitive',
        },
      };
    }

    if (month) {
      whereClause.month = month;
    }

    if (year) {
      whereClause.year = year;
    }

    const [expenseList, totalCount] = await Promise.all([
      this.prisma.expense.findMany({
        where: whereClause,
        skip,
        take: limit,
        include: {
          subsector: {
            select: {
              name: true,
            },
          },
          supplier: {
            select: {
              name: true,
            },
          },
        },
      }),
      this.prisma.expense.count({
        where: whereClause,
      }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      expenseList,
      meta: {
        totalItems: totalCount,
        itemsPerPage: limit,
        currentPage: page,
        totalPages,
      },
    };
  }

  async getExpenseById(expenseId: number): Promise<Expense | null> {
    const expense = await this.prisma.expense.findUnique({
      where: { id: expenseId },
    });
    return expense;
  }

  async getCreationFormData(): Promise<{
    supplierList: { id: number; name: string }[];
    subSectorList: { id: number; name: string }[];
    secretaryList: { id: number; name: string }[];
  }> {
    const supplierList = await this.prisma.supplier.findMany({
      select: { id: true, name: true },
    });
    const subSectorList = await this.prisma.subSector.findMany({
      select: { id: true, name: true },
    });
    const secretaryList = await this.prisma.secretary.findMany({
      select: { id: true, name: true },
    });
    return {
      supplierList,
      subSectorList,
      secretaryList,
    };
  }

  async deleteExpenseById(expenseId: number): Promise<void> {
    await this.prisma.expense.delete({
      where: { id: expenseId },
    });
  }
}
