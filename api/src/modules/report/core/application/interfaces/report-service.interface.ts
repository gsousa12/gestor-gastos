import { ReportEntity } from '../../domain/entities/report.entity';

export interface IReportService {
  createReport(report: ReportEntity): Promise<Buffer>;
  getReportFileName(report: ReportEntity): string;
}
