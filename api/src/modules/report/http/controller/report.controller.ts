import { ExpenseMapper } from '@modules/expense/core/application/mappers/expense.mapper';
import { ExpenseService } from '@modules/expense/core/application/services/expense.service';
import { ReportMapper } from '@modules/report/core/application/mappers/report.mapper';
import { ReportService } from '@modules/report/core/application/services/report.service';
import { Controller } from '@nestjs/common';

@Controller('report')
export class ReportController {
  constructor(
    private readonly reportService: ReportService,
    private readonly reportMapper: ReportMapper,
  ) {}
}
