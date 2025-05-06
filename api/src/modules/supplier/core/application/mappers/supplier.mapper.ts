import { Supplier } from '@prisma/client';
import { CreateSupplierRequestDto } from '../dtos/request/create-supplier.request.dto';
import { SupplierEntity } from '../../domain/entities/supplier.entity';
import { CreateSupplierResponseDto } from '../../domain/dtos/response/create-supplier.response.dto';
import { GetSupplierListResponseDto } from '../../domain/dtos/response/get-supplier-list.response.dto';
import { GetSupplierByIdResponseDto } from '../../domain/dtos/response/get-supplier-id.response.dto';

export class SupplierMapper {
  async toMapperCreateSupplierRequest(request: CreateSupplierRequestDto): Promise<SupplierEntity> {
    const supplier = new SupplierEntity();
    supplier.name = request.name;
    supplier.companyName = request.companyName;
    supplier.taxId = request.taxId;
    supplier.contactEmail = request.contactEmail;
    supplier.contactPhone = request.contactPhone;
    return supplier;
  }

  async toMapperCreateSupplierResponse(createdSupplier: Supplier): Promise<CreateSupplierResponseDto> {
    const response = new CreateSupplierResponseDto();
    (response.name = createdSupplier.name), (response.createdAt = createdSupplier.createdAt);
    return response;
  }

  async toMapperGetSupplierListResponse(supplierList: Supplier[]): Promise<GetSupplierListResponseDto[]> {
    return supplierList.map((supplier) => {
      const response = new GetSupplierListResponseDto();
      response.id = supplier.id;
      response.name = supplier.name;
      response.companyName = supplier.companyName;
      response.taxId = supplier.taxId;
      response.recurringDebt = supplier.recurringDebt;
      response.contactEmail = supplier.contactEmail;
      response.contactPhone = supplier.contactPhone;
      response.createdAt = supplier.createdAt;
      response.updatedAt = supplier.updatedAt;
      return response;
    });
  }

  async toMapperGetSupplierByIdResponse(supplier: Supplier): Promise<GetSupplierByIdResponseDto> {
    const response = new GetSupplierByIdResponseDto();
    response.name = supplier.name;
    response.companyName = supplier.companyName;
    response.taxId = supplier.taxId;
    response.recurringDebt = supplier.recurringDebt;
    response.contactEmail = supplier.contactEmail;
    response.contactPhone = supplier.contactPhone;
    response.createdAt = supplier.createdAt;
    response.updatedAt = supplier.updatedAt;
    return response;
  }
}
