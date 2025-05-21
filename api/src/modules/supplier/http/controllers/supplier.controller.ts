import { config } from '@common/configuration/config';
import { createApiResponse } from '@common/utils/api-response';
import { CreateSupplierRequestDto } from '@modules/supplier/core/application/dtos/request/create-supplier.request.dto';
import { SupplierMapper } from '@modules/supplier/core/application/mappers/supplier.mapper';
import { SupplierService } from '@modules/supplier/core/application/services/supplier.service';
import {
  Body,
  Controller,
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

@Controller('supplier')
export class SupplierController {
  constructor(
    private readonly supplierService: SupplierService,
    private readonly supplierMapper: SupplierMapper,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/')
  @HttpCode(HttpStatus.OK)
  async createSupplier(@Body() request: CreateSupplierRequestDto) {
    const supplier = await this.supplierMapper.toMapperCreateSupplierRequest(request);
    const createdSupplier = await this.supplierService.createSupplier(supplier);
    const response = await this.supplierMapper.toMapperCreateSupplierResponse(createdSupplier);
    return createApiResponse('Fornecedor cadastrado com sucesso', response);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getSupplierList(
    @Query('page') page: number = 1,
    @Query('name') name: string | null,
    @Query('has_debits') hasDebits: string | undefined,
  ) {
    const parsedHasDebits = hasDebits === 'true' ? true : hasDebits === 'false' ? false : null;
    const limit = config.PAGINATION.LIST_PAGE_LIMIT;

    const { supplierList, meta } = await this.supplierService.getSupplierList(
      page,
      limit,
      name,
      parsedHasDebits,
    );
    const response = await this.supplierMapper.toMapperGetSupplierListResponse(supplierList);
    return createApiResponse('Lista de fornecedores', response, meta);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getSupplierById(@Param('id') id: number) {
    const supplierId = Number(id);
    const details = await this.supplierService.getSupplierDetails(supplierId);
    return createApiResponse('Fornecedor encontrado com sucesso', details);
  }
}
