import { config } from '@common/configuration/config';
import { createApiResponse } from '@common/utils/api-response';
import { mainErrorResponse } from '@common/utils/main-error-response';
import { CreateExpenseRequestDto } from '@modules/expense/core/application/dtos/request/create-expense.request.dto';
import { ExpenseMapper } from '@modules/expense/core/application/mappers/expense.mapper';
import { ExpenseService } from '@modules/expense/core/application/services/expense.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Request,
} from '@nestjs/common';

@Controller('expense')
export class ExpenseController {
  constructor(
    private readonly expenseService: ExpenseService,
    private readonly expenseMapper: ExpenseMapper,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.OK)
  async createExpense(@Body() request: CreateExpenseRequestDto) {
    try {
      const expense = await this.expenseMapper.toMapperCreateExpenseRequest(request);
      const createdExpense = await this.expenseService.createExpense(expense);
      const response = await this.expenseMapper.toMapperCreateExpenseResponse(createdExpense);
      return createApiResponse('Despesa criada com sucesso', response);
    } catch (error) {
      return mainErrorResponse(error);
    }
  }

  @Get('/creation-form-data')
  @HttpCode(HttpStatus.OK)
  async getCreationFormData() {
    try {
      const creationFormData = await this.expenseService.getCreationFormData();
      return createApiResponse('Dados para criação de despesa', creationFormData);
    } catch (error) {
      return mainErrorResponse(error);
    }
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getExpenseList(
    @Query('page') page: number | undefined,
    @Query('supplierName') supplierName: string | undefined,
    @Query('month') month: number | undefined,
    @Query('year') year: string | undefined,
  ) {
    const limit = config.PAGINATION.LIST_PAGE_LIMIT;
    const parsedMonth = month !== undefined ? Number(month) : undefined;
    const parsedPage = page !== undefined ? Number(page) : 1;
    try {
      const { expenseList, meta } = await this.expenseService.getExpenseList(
        parsedPage,
        limit,
        supplierName,
        parsedMonth,
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
      return createApiResponse('Despesa encontrado com sucesso', response);
    } catch (error) {
      return mainErrorResponse(error);
    }
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async deleteExpenseById(@Param('id') id: number) {
    const expenseId = Number(id);
    try {
      await this.expenseService.deleteExpenseById(expenseId);
      return createApiResponse('Despesa deletado com sucesso', {});
    } catch (error) {
      return mainErrorResponse(error);
    }
  }
}
