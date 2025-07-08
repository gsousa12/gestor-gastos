import { PrismaService } from '@common/modules/prisma/service/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { IExpenseRepository } from '../interfaces/expense-repository.interface';
import { ExpenseEntity, ExpenseItemEntity } from '@modules/expense/core/domain/entities/expense.entity';
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
        orderBy: {
          createdAt: 'desc',
        },
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

  // TODO: TIPAR RESPONSE(ANY)
  async getExpenseById(expenseId: number): Promise<any | null> {
    const expense = await this.prisma.expense.findUnique({
      where: { id: expenseId },
      include: {
        supplier: {
          select: {
            name: true,
            companyName: true,
            recurringDebit: true,
          },
        },
        secretary: {
          select: {
            name: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
        subsector: {
          select: {
            name: true,
          },
        },
        expenseItems: {
          select: {
            itemId: true,
            quantity: true,
            unitValue: true,
            item: {
              select: {
                name: true,
                description: true,
              },
            },
          },
        },
      },
    });
    return expense;
  }

  async getCreationFormData(): Promise<{
    supplierList: { id: number; name: string }[];
    subSectorList: { id: number; name: string }[];
    secretaryList: { id: number; name: string }[];
    itemList: { id: number; name: string; description: string | null }[];
  }> {
    const supplierList = await this.prisma.supplier.findMany({
      select: { id: true, name: true },
      where: { deletedAt: null },
      orderBy: { name: 'asc' },
    });
    const subSectorList = await this.prisma.subSector.findMany({
      select: { id: true, name: true },
      where: { deletedAt: null },
      orderBy: { name: 'asc' },
    });
    const secretaryList = await this.prisma.secretary.findMany({
      select: { id: true, name: true },
      orderBy: { name: 'asc' },
    });
    const itemList = await this.prisma.item.findMany({
      select: { id: true, name: true, description: true },
      orderBy: { name: 'asc' },
    });
    return {
      supplierList,
      subSectorList,
      secretaryList,
      itemList,
    };
  }

  async deleteExpenseById(expenseId: number): Promise<void> {
    await this.prisma.expense.delete({
      where: { id: expenseId },
    });
  }

  async createExpenseWithItems(expense: ExpenseEntity): Promise<any> {
    // Evita duplicidade de item na mesma despesa
    const itemIds: { [key: number]: true } = {};

    // Processa os itens: resolve id, cria se necessário
    const processedItems = await Promise.all(
      expense.items.map(async (item: ExpenseItemEntity) => {
        let itemId = item.id;

        if (!itemId) {
          // Busca por name (case-insensitive)
          const existingItem = await this.prisma.item.findFirst({
            where: {
              name: { equals: item.name, mode: 'insensitive' },
              deletedAt: null,
            },
          });

          if (existingItem) {
            itemId = existingItem.id;
          } else {
            // Cria novo item
            const newItem = await this.prisma.item.create({
              data: {
                name: item.name,
                description: item.description ?? null,
                createdAt: new Date(),
              },
            });
            itemId = newItem.id;
          }
        }

        // Evita duplicidade de item na mesma despesa
        if (itemIds[itemId]) {
          throw new BadRequestException(
            `O item "${item.name}" foi informado mais de uma vez na mesma despesa.`,
          );
        }
        itemIds[itemId] = true;

        return {
          itemId,
          quantity: item.quantity,
          unitValue: item.unitValue,
        };
      }),
    );

    // Calcula o amount total
    const amount = processedItems.reduce((sum, item) => sum + item.quantity * item.unitValue, 0);

    // Cria tudo em transação
    return await this.prisma.$transaction(async (prisma) => {
      const expenseRecord = await prisma.expense.create({
        data: {
          description: expense.description,
          month: expense.month,
          year: expense.year,
          amount,
          status: ExpenseStatus.PENDING,
          createdAt: new Date(),
          supplierId: expense.supplierId,
          secretaryId: expense.secretaryId,
          userId: expense.userId,
          subsectorId: expense.subsectorId,
        },
      });

      await Promise.all(
        processedItems.map((item) =>
          prisma.expenseItem.create({
            data: {
              expenseId: expenseRecord.id,
              itemId: item.itemId,
              quantity: item.quantity,
              unitValue: item.unitValue,
            },
          }),
        ),
      );

      // Retorna a despesa criada com os itens associados
      return prisma.expense.findUnique({
        where: { id: expenseRecord.id },
        include: {
          expenseItems: {
            include: {
              item: true,
            },
          },
        },
      });
    });
  }
}
