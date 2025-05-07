import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IExpenseService } from '../interfaces/expense-service.interface';
import { EXPENSE_REPOSITORY } from '@common/tokens/repositories.tokens';
import { ExpenseRepository } from '@modules/expense/infrastructure/repository/expense.repository';
import { ExpenseHelper } from '../helpers/expense.helper';
import { Expense } from '@prisma/client';
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
    const createdExpense = await this.expenseRepository.createExpense(expense);
    return createdExpense;
  }

  async getExpenseList(
    page: number,
    limit: number,
    supplierName?: string,
    mouth?: number,
    year?: string,
  ): Promise<{ expenseList: Expense[]; meta: PaginationMeta }> {
    const { expenseList: expenseList, meta } = await this.expenseRepository.getExpenseList(
      page,
      limit,
      supplierName,
      mouth,
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
}
