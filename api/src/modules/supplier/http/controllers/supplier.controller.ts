import { config } from '@common/configuration/config';
import { CreateApiResponse } from '@common/utils/api-response';
import { MainErrorResponse } from '@common/utils/main-error-response';
import { CreateSupplierRequestDto } from '@modules/supplier/core/application/dtos/request/create-supplier.request.dto';
import { SupplierMapper } from '@modules/supplier/core/application/mappers/supplier.mapper';
import { SupplierService } from '@modules/supplier/core/application/services/supplier.service';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, Request } from '@nestjs/common';

@Controller('supplier')
export class SupplierController {
  constructor(
    private readonly supplierService: SupplierService,
    private readonly supplierMapper: SupplierMapper,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.OK)
  async createSupplier(@Body() request: CreateSupplierRequestDto, @Request() req) {
    try {
      const supplier = await this.supplierMapper.toMapperCreateSupplierRequest(request);
      const createdSupplier = await this.supplierService.createSupplier(supplier);
      const response = await this.supplierMapper.toMapperCreateSupplierResponse(createdSupplier);
      return CreateApiResponse('Fornecedor cadastrado com sucesso', response);
    } catch (error) {
      return MainErrorResponse(error);
    }
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getSupplierList(
    @Query('page') page: number = 1,
    @Query('name') name: string | null,
    @Query('has_debts') hasDebts: string | undefined,
  ) {
    const parsedHasDebts = hasDebts === 'true' ? true : hasDebts === 'false' ? false : null;
    const limit = config.PAGINATION.LIST_PAGE_LIMIT;

    try {
      const { supplierList, meta } = await this.supplierService.getSupplierList(
        page,
        limit,
        name,
        parsedHasDebts,
      );
      const response = await this.supplierMapper.toMapperGetSupplierListResponse(supplierList);
      return CreateApiResponse('Lista de fornecedores', response, meta);
    } catch (error) {
      return MainErrorResponse(error);
    }
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getSupplierById(@Request() req, @Param('id') id: number) {
    const supplierId = Number(id);
    try {
      const supplier = await this.supplierService.getSupplierById(supplierId);
      const response = await this.supplierMapper.toMapperGetSupplierByIdResponse(supplier);
      return CreateApiResponse('Usuário encontrado com sucesso', response);
    } catch (error) {
      return MainErrorResponse(error);
    }
  }
}
