import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IReportService } from '../interfaces/report-service.interface';
import { REPORT_REPOSITORY } from '@common/tokens/repositories.tokens';
import { ReportHelper } from '../helpers/report.helper';
import { ReportRepository } from '@modules/report/infrastructure/repository/report.repository';
import { ReportEntity } from '../../domain/entities/report.entity';
import { PaymentReportStrategy } from '../strategies/report.strategy';
import { IReportStrategy } from '../interfaces/report-strategy.interface';
import { getMonthName } from '@common/utils/conversion';

@Injectable()
export class ReportService implements IReportService {
  constructor(
    @Inject(REPORT_REPOSITORY) private readonly reportRepository: ReportRepository,
    private readonly reportHelper: ReportHelper,
  ) {}

  async createReport(report: ReportEntity): Promise<Buffer> {
    const data = await this.reportRepository.getDataForReport(report.reportType, report.month, report.year);

    if (!data || data.length === 0) {
      throw new BadRequestException('Nenhum dado encontrado para o relatório solicitado.');
    }

    const strategy = this.resolveStrategy(report.reportType);

    const documentDefinition = strategy.buildDocumentDefinition(data, report);

    return this.reportHelper.generatePdf(documentDefinition);
  }

  private resolveStrategy(type: string): IReportStrategy {
    switch (type) {
      case 'payment':
        return new PaymentReportStrategy(this.reportHelper);
      default:
        throw new BadRequestException(`Tipo de relatório não suportado: ${type}`);
    }
  }

  getReportFileName(report: ReportEntity): string {
    const monthName = getMonthName(report.month);
    const type = this.reportHelper.getReportType(report.reportType);
    return `relatorio_${type}_${monthName}_${report.year}.pdf`;
  }
}
