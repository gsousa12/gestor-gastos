import { ReportEntity } from '../../domain/entities/report.entity';
import { CreateReportRequestDto } from '../dtos/request/create-payment-report.request.dto';

export class ReportMapper {
  toMapperCreateReportRequest(request: CreateReportRequestDto): ReportEntity {
    const report = new ReportEntity();
    report.reportType = request.reportType;
    report.month = request.month;
    report.year = request.year;

    return report;
  }
}
