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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('expense')
export class ExpenseController {
  constructor(
    private readonly expenseService: ExpenseService,
    private readonly expenseMapper: ExpenseMapper,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/')
  @HttpCode(HttpStatus.OK)
  async createExpense(@Body() request: CreateExpenseRequestDto) {
    try {
      const expense = this.expenseMapper.toMapperCreateExpenseRequest(request);
      const createdExpense = await this.expenseService.createExpense(expense);
      const response = this.expenseMapper.toMapperCreateExpenseResponse(createdExpense);
      return createApiResponse('Despesa criada com sucesso', response);
    } catch (error) {
      return mainErrorResponse(error);
    }
  }

  @UseGuards(AuthGuard('jwt'))
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

  @UseGuards(AuthGuard('jwt'))
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
      const response = this.expenseMapper.toMapperGetExpenseListResponse(expenseList);
      return createApiResponse('Lista de despesas', response, meta);
    } catch (error) {
      return mainErrorResponse(error);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getExpenseById(@Param('id') id: number) {
    const expenseId = Number(id);
    try {
      const expense = await this.expenseService.getExpenseById(expenseId);
      const response = this.expenseMapper.toMapperGetExpenseByIdResponse(expense);
      return createApiResponse('Despesa encontrado com sucesso', response);
    } catch (error) {
      return mainErrorResponse(error);
    }
  }

  @UseGuards(AuthGuard('jwt'))
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
