import { PrismaService } from '@common/modules/prisma/service/prisma.service';
import { Injectable } from '@nestjs/common';
import { IReportRepository } from '../interfaces/report-repository.interface';

@Injectable()
export class ReportRepository implements IReportRepository {
  constructor(private readonly prisma: PrismaService) {}
}
