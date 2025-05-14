import { Expense } from '@prisma/client';
import { ExpenseEntity } from '../../domain/entities/expense.entity';
import { CreateExpenseRequestDto } from '../dtos/request/create-expense.request.dto';
import e from 'express';

export class ExpenseMapper {
  async toMapperCreateExpenseRequest(request: CreateExpenseRequestDto): Promise<ExpenseEntity> {
    const expense = new ExpenseEntity();
    expense.description = request.description;
    expense.month = request.month;
    expense.year = request.year;
    expense.amount = request.amount;
    expense.supplierId = request.supplierId;
    expense.secretaryId = request.secretaryId;
    expense.userId = request.userId;
    expense.subsectorId = request.subsectorId;
    return expense;
  }

  async toMapperCreateExpenseResponse(createdExpense: Expense): Promise<ExpenseEntity> {
    const response = new ExpenseEntity();
    response.description = createdExpense.description;
    response.month = createdExpense.month;
    response.year = createdExpense.year;
    response.amount = createdExpense.amount;
    response.supplierId = createdExpense.supplierId;
    response.secretaryId = createdExpense.secretaryId;
    response.userId = createdExpense.userId;
    response.subsectorId = createdExpense.subsectorId;
    return response;
  }

  toMapperGetExpenseListResponse(expenseList: any[]): ExpenseEntity[] {
    return expenseList.map((expense) => ({
      id: expense.id,
      description: expense.description,
      month: expense.month,
      year: expense.year,
      amount: expense.amount,
      createdAt: expense.createdAt,
      updatedAt: expense.updatedAt,
      supplierId: expense.supplierId,
      secretaryId: expense.secretaryId,
      userId: expense.userId,
      subsectorId: expense.subsectorId,
      supplierName: expense.supplier?.name || null,
      subsectorName: expense.subsector?.name || null,
    }));
  }

  async toMapperGetExpenseByIdResponse(expense: Expense): Promise<ExpenseEntity> {
    const response = new ExpenseEntity();
    response.description = expense.description;
    response.month = expense.month;
    response.year = expense.year;
    response.amount = expense.amount;
    response.supplierId = expense.supplierId;
    response.secretaryId = expense.secretaryId;
    response.userId = expense.userId;
    response.subsectorId = expense.subsectorId;
    response.createdAt = expense.createdAt;
    return response;
  }
}
