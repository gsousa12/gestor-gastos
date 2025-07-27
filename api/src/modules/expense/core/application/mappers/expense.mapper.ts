import { Expense } from '@prisma/client';
import { ExpenseEntity, ExpenseItemEntity } from '../../domain/entities/expense.entity';
import { CreateExpenseRequestDto } from '../dtos/request/create-expense.request.dto';

export class ExpenseMapper {
  // A função agora está alinhada com o DTO e a Entidade
  toMapperCreateExpenseRequest(request: CreateExpenseRequestDto): ExpenseEntity {
    const expense = new ExpenseEntity();
    expense.description = request.description;
    expense.month = request.month;
    expense.year = request.year;
    expense.supplierId = request.supplierId;
    expense.secretaryId = request.secretaryId;
    expense.userId = request.userId;
    expense.subsectorId = request.subsectorId;

    // Mapeamento correto para a ExpenseItemEntity corrigida
    expense.items = request.items.map((itemDto) => {
      const itemEntity = new ExpenseItemEntity();
      itemEntity.id = itemDto.id;
      itemEntity.name = itemDto.name;
      itemEntity.description = itemDto.description ?? null;
      itemEntity.ci = itemDto.ci;
      itemEntity.quantity = itemDto.quantity;
      itemEntity.totalValue = itemDto.totalValue; // <-- Vindo do DTO
      itemEntity.unitOfMeasure = itemDto.unitOfMeasure; // <-- Vindo do DTO
      itemEntity.unitValue = null; // <-- Agora é um valor válido (null) para a entidade
      return itemEntity;
    });

    return expense;
  }

  toMapperCreateExpenseResponse(createdExpense: Expense): ExpenseEntity {
    const response = new ExpenseEntity();
    response.description = createdExpense.description;
    response.month = createdExpense.month;
    response.year = createdExpense.year;

    // Formatando amount como string com 2 casas decimais (opcional)
    response.amount = Number(createdExpense.amount.toFixed(2));

    response.supplierId = createdExpense.supplierId;
    response.secretaryId = createdExpense.secretaryId;
    response.userId = createdExpense.userId;
    response.subsectorId = createdExpense.subsectorId;

    return response;
  }

  // FIXME: Tipar expenseList corretamente
  toMapperGetExpenseListResponse(expenseList: any[]): any[] {
    return expenseList.map((expense) => ({
      id: expense.id,
      description: expense.description,
      month: expense.month,
      year: expense.year,
      amount: expense.amount,
      status: expense.status,
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

  toMapperGetExpenseByIdResponse(expense: Expense): ExpenseEntity {
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
