import { Module } from '@nestjs/common';
import { SupplierController } from './http/controllers/supplier.controller';
import { SUPPLIER_REPOSITORY } from '@common/tokens/repositories.tokens';
import { SupplierRepository } from './infrastructure/repositories/supplier.repository';
import { SupplierService } from './core/application/services/supplier.service';
import { SupplierHelper } from './core/application/helpers/supplier.helper';
import { PrismaService } from '@common/modules/prisma/service/prisma.service';
import { SupplierMapper } from './core/application/mappers/supplier.mapper';

@Module({
  imports: [],
  controllers: [SupplierController],
  providers: [
    {
      provide: SUPPLIER_REPOSITORY,
      useClass: SupplierRepository,
    },
    SupplierService,
    SupplierHelper,
    PrismaService,
    SupplierMapper,
  ],
  exports: [],
})
export class SupplierModule {}
