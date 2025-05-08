import { Inject, Injectable } from '@nestjs/common';
import { IReportService } from '../interfaces/report-service.interface';
import { REPORT_REPOSITORY } from '@common/tokens/repositories.tokens';
import { ReportHelper } from '../helpers/report.helper';
import { ReportRepository } from '@modules/report/infrastructure/repository/report.repository';

@Injectable()
export class ReportService implements IReportService {
  constructor(
    @Inject(REPORT_REPOSITORY) private readonly reportRepository: ReportRepository,
    private readonly reportHelper: ReportHelper,
  ) {}
}
