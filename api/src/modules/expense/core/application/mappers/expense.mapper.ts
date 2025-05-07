import { Expense } from '@prisma/client';
import { ExpenseEntity } from '../../domain/entities/expense.entity';
import { CreateExpenseRequestDto } from '../dtos/request/create-expense.request.dto';

export class ExpenseMapper {
  async toMapperCreateExpenseRequest(request: CreateExpenseRequestDto): Promise<ExpenseEntity> {
    const expense = new ExpenseEntity();
    expense.description = request.description;
    expense.mouth = request.mouth;
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
    response.mouth = createdExpense.mouth;
    response.year = createdExpense.year;
    response.amount = createdExpense.amount;
    response.supplierId = createdExpense.supplierId;
    response.secretaryId = createdExpense.secretaryId;
    response.userId = createdExpense.userId;
    response.subsectorId = createdExpense.subsectorId;
    return response;
  }

  async toMapperGetExpenseListResponse(supplierList: Expense[]): Promise<ExpenseEntity[]> {
    const response = supplierList.map((supplier) => {
      const expense = new ExpenseEntity();
      expense.description = supplier.description;
      expense.mouth = supplier.mouth;
      expense.year = supplier.year;
      expense.amount = supplier.amount;
      expense.supplierId = supplier.supplierId;
      expense.secretaryId = supplier.secretaryId;
      expense.userId = supplier.userId;
      expense.subsectorId = supplier.subsectorId;
      expense.createdAt = supplier.createdAt;
      expense.supplierName = supplier.supplierName;
      return expense;
    });
    return response;
  }

  async toMapperGetExpenseByIdResponse(expense: Expense): Promise<ExpenseEntity> {
    const response = new ExpenseEntity();
    response.description = expense.description;
    response.mouth = expense.mouth;
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
