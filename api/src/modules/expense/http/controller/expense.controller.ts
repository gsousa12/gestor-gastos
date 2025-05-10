import { config } from '@common/configuration/config';
import { createApiResponse } from '@common/utils/api-response';
import { mainErrorResponse } from '@common/utils/main-error-response';
import { CreateExpenseRequestDto } from '@modules/expense/core/application/dtos/request/create-expense.request.dto';
import { ExpenseMapper } from '@modules/expense/core/application/mappers/expense.mapper';
import { ExpenseService } from '@modules/expense/core/application/services/expense.service';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, Request } from '@nestjs/common';

@Controller('expense')
export class ExpenseController {
  constructor(
    private readonly expenseService: ExpenseService,
    private readonly expenseMapper: ExpenseMapper,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.OK)
  async createExpense(@Body() request: CreateExpenseRequestDto, @Request() req) {
    try {
      const expense = await this.expenseMapper.toMapperCreateExpenseRequest(request);
      const createdExpense = await this.expenseService.createExpense(expense);
      const response = await this.expenseMapper.toMapperCreateExpenseResponse(createdExpense);
      return createApiResponse('Despesa criada com sucesso', response);
    } catch (error) {
      return mainErrorResponse(error);
    }
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getExpenseList(
    @Query('page') page: number = 1,
    @Query('supplierName') supplierName: string | undefined,
    @Query('mouth') mouth: number | undefined,
    @Query('year') year: string | undefined,
  ) {
    const limit = config.PAGINATION.LIST_PAGE_LIMIT;

    try {
      const { expenseList, meta } = await this.expenseService.getExpenseList(
        page,
        limit,
        supplierName,
        mouth,
        year,
      );
      const response = await this.expenseMapper.toMapperGetExpenseListResponse(expenseList);
      return createApiResponse('Lista de despesas', response, meta);
    } catch (error) {
      return mainErrorResponse(error);
    }
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getExpenseById(@Param('id') id: number) {
    const expenseId = Number(id);
    try {
      const expense = await this.expenseService.getExpenseById(expenseId);
      const response = await this.expenseMapper.toMapperGetExpenseByIdResponse(expense);
      return createApiResponse('Fornecedor encontrado com sucesso', response);
    } catch (error) {
      return mainErrorResponse(error);
    }
  }
}
