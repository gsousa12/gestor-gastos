import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IExpenseService } from '../interfaces/expense-service.interface';
import { EXPENSE_REPOSITORY } from '@common/tokens/repositories.tokens';
import { ExpenseRepository } from '@modules/expense/infrastructure/repository/expense.repository';
import { ExpenseHelper } from '../helpers/expense.helper';
import { Expense, Secretary, Sector, Supplier } from '@prisma/client';
import { ExpenseEntity } from '../../domain/entities/expense.entity';
import { PaginationMeta } from '@common/structures/types';

@Injectable()
export class ExpenseService implements IExpenseService {
  constructor(
    @Inject(EXPENSE_REPOSITORY) private readonly expenseRepository: ExpenseRepository,
    private readonly expenseHelper: ExpenseHelper,
  ) {}

  async createExpense(expense: ExpenseEntity): Promise<Expense> {
    const { verifyExistence, message } = await this.expenseRepository.verifyExistence(expense);
    if (!verifyExistence) {
      throw new NotFoundException(message);
    }

    const createdExpense = await this.expenseRepository.createExpenseWithItems(expense);
    return createdExpense;
  }

  async getExpenseList(
    page: number,
    limit: number,
    supplierName?: string,
    month?: number,
    year?: string,
  ): Promise<{ expenseList: Expense[]; meta: PaginationMeta }> {
    const { expenseList: expenseList, meta } = await this.expenseRepository.getExpenseList(
      page,
      limit,
      supplierName,
      month,
      year,
    );

    return !expenseList || expenseList.length === 0
      ? { expenseList: [], meta }
      : {
          expenseList,
          meta,
        };
  }

  async getExpenseById(expenseId: number): Promise<Expense> {
    const expense = await this.expenseRepository.getExpenseById(expenseId);

    if (!expense) {
      throw new NotFoundException('Despesa não encontrada.');
    }

    return expense;
  }

  async getCreationFormData(): Promise<{
    supplierList: { id: number; name: string }[];
    subSectorList: { id: number; name: string }[];
    secretaryList: { id: number; name: string }[];
    itemList: { id: number; name: string; description: string | null }[];
  }> {
    const { supplierList, subSectorList, secretaryList, itemList } =
      await this.expenseRepository.getCreationFormData();

    return {
      supplierList: supplierList || [],
      subSectorList: subSectorList || [],
      secretaryList: secretaryList || [],
      itemList: itemList || [],
    };
  }

  async deleteExpenseById(expenseId: number): Promise<void> {
    const expense = await this.expenseRepository.getExpenseById(expenseId);

    if (!expense) {
      throw new NotFoundException('Despesa não encontrada.');
    }

    await this.expenseRepository.deleteExpenseById(expenseId);
  }
}
