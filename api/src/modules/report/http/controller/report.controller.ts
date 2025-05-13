import { createApiResponse } from '@common/utils/api-response';
import { mainErrorResponse } from '@common/utils/main-error-response';
import { CreateReportRequestDto } from '@modules/report/core/application/dtos/request/create-payment-report.request.dto';
import { ReportMapper } from '@modules/report/core/application/mappers/report.mapper';
import { ReportService } from '@modules/report/core/application/services/report.service';
import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('report')
export class ReportController {
  constructor(
    private readonly reportService: ReportService,
    private readonly reportMapper: ReportMapper,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.OK)
  async createReport(@Body() request: CreateReportRequestDto, @Res() res: Response) {
    try {
      const report = this.reportMapper.toMapperCreateReportRequest(request);
      const pdfBuffer = await this.reportService.createReport(report);
      const fileName = this.reportService.getFileName(report);

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=${fileName}`,
        'Content-Length': pdfBuffer.length,
      });

      res.end(pdfBuffer);
    } catch (error) {
      res.status(500).json(mainErrorResponse(error));
    }
  }
}
