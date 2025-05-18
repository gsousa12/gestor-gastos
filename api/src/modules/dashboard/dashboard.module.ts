import { Module } from '@nestjs/common';
import { DashboardController } from './http/controller/dashboard.controller';
import { DASHBOARD_REPOSITORY } from '@common/tokens/repositories.tokens';
import { DashboardRepository } from './infrastructure/repository/dashboard.repository';
import { DashboardService } from './core/application/services/dashboard.service';
import { DashboardHelper } from './core/application/helpers/dashboard.helper';
import { PrismaService } from '@common/modules/prisma/service/prisma.service';
import { DashboardMapper } from './core/application/mappers/dashboard.mapper';

@Module({
  imports: [],
  controllers: [DashboardController],
  providers: [
    {
      provide: DASHBOARD_REPOSITORY,
      useClass: DashboardRepository,
    },
    DashboardService,
    DashboardHelper,
    PrismaService,
    DashboardMapper,
  ],
  exports: [],
})
export class DashboardModule {}
