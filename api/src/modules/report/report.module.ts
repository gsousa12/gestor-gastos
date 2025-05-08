import { Module } from '@nestjs/common';
import { PrismaService } from '@common/modules/prisma/service/prisma.service';
import { ReportRepository } from './infrastructure/repository/report.repository';
import { ReportService } from './core/application/services/report.service';
import { ReportHelper } from './core/application/helpers/report.helper';
import { ReportMapper } from './core/application/mappers/report.mapper';
import { ReportController } from './http/controller/report.controller';
import { REPORT_REPOSITORY } from '@common/tokens/repositories.tokens';

@Module({
  imports: [],
  controllers: [ReportController],
  providers: [
    {
      provide: REPORT_REPOSITORY,
      useClass: ReportRepository,
    },
    ReportService,
    ReportHelper,
    PrismaService,
    ReportMapper,
  ],
  exports: [],
})
export class ReportModule {}
