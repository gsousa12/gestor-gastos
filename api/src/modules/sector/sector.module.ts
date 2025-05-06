import { Module } from '@nestjs/common';
import { SectorController } from './http/controllers/sector.controller';
import { SECTOR_REPOSITORY } from '@common/tokens/repositories.tokens';
import { SectorRepository } from './infrastructure/repositories/sector.repository';
import { SectorService } from './core/application/services/sector.service';
import { SectorHelper } from './core/application/helpers/sector.helper';
import { PrismaService } from '@common/modules/prisma/service/prisma.service';
import { SectorMapper } from './core/application/mappers/sector.mapper';

@Module({
  imports: [],
  controllers: [SectorController],
  providers: [
    {
      provide: SECTOR_REPOSITORY,
      useClass: SectorRepository,
    },
    SectorService,
    SectorHelper,
    PrismaService,
    SectorMapper,
  ],
  exports: [],
})
export class SectorModule {}
