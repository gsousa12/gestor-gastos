import { Supplier } from '@prisma/client';
import { CreateSupplierRequestDto } from '../dtos/request/create-supplier.request.dto';
import { SupplierEntity } from '../../domain/entities/supplier.entity';

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

  async toMapperCreateSupplierResponse(createdSupplier: Supplier): Promise<SupplierEntity> {
    const response = new SupplierEntity();
    (response.name = createdSupplier.name), (response.createdAt = createdSupplier.createdAt);
    return response;
  }

  async toMapperGetSupplierListResponse(supplierList: Supplier[]): Promise<SupplierEntity[]> {
    return supplierList.map((supplier) => {
      const response = new SupplierEntity();
      response.id = supplier.id;
      response.name = supplier.name;
      response.companyName = supplier.companyName;
      response.taxId = supplier.taxId;
      response.recurringDebit = supplier.recurringDebit;
      response.contactEmail = supplier.contactEmail;
      response.contactPhone = supplier.contactPhone;
      response.createdAt = supplier.createdAt;
      response.updatedAt = supplier.updatedAt;
      return response;
    });
  }

  async toMapperGetSupplierByIdResponse(supplier: Supplier): Promise<SupplierEntity> {
    const response = new SupplierEntity();
    response.name = supplier.name;
    response.companyName = supplier.companyName;
    response.taxId = supplier.taxId;
    response.recurringDebit = supplier.recurringDebit;
    response.contactEmail = supplier.contactEmail;
    response.contactPhone = supplier.contactPhone;
    response.createdAt = supplier.createdAt;
    response.updatedAt = supplier.updatedAt;
    return response;
  }
}
