import { ReportEntity } from '../../domain/entities/report.entity';

export interface IReportService {
  createReport(report: ReportEntity): Promise<Buffer>;
  getFileName(report: ReportEntity): string;
}
