import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { ReportEntity } from '../../domain/entities/report.entity';

export interface IReportStrategy {
  buildDocumentDefinition(data: any[], report: ReportEntity): TDocumentDefinitions;
}
