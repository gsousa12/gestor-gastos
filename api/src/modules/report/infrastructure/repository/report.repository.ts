import { PrismaService } from '@common/modules/prisma/service/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { IReportRepository } from '../interfaces/report-repository.interface';
import { PaymentStatus } from '@modules/payment/core/domain/enums/payment.enum';

@Injectable()
export class ReportRepository implements IReportRepository {
  constructor(private readonly prisma: PrismaService) {}

  private readonly reportFetchers: Record<string, (month: number, year: string) => Promise<any[]>> = {
    payment: this.getPayments.bind(this),
  };

  async getDataForReport(type: string, month: number, year: string): Promise<any[]> {
    const fetcher = this.reportFetchers[type];
    if (!fetcher) {
      throw new BadRequestException(`Tipo de dado não suportado: ${type}`);
    }

    return fetcher(month, year);
  }

  private async getPayments(month: number, year: string): Promise<any[]> {
    return this.prisma.payment.findMany({
      where: {
        month: month,
        year: year,
        status: PaymentStatus.ACTIVE,
      },
      include: {
        expense: true,
        supplier: true,
        sector: true,
      },
    });
  }
}
