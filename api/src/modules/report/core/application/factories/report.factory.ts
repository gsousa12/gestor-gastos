import { Injectable } from '@nestjs/common';
import { IReportStrategy } from '../interfaces/report-strategy.interface';
import { PaymentReportStrategy } from '../strategies/report.strategy';

@Injectable()
export class ReportFactory {
  constructor(
    private paymentReportStrategy: PaymentReportStrategy,
    // outros strategies no futuro
  ) {}

  getStrategy(reportType: string): IReportStrategy {
    switch (reportType) {
      case 'payment':
        return this.paymentReportStrategy;
      // case 'expense': return this.expenseReportStrategy;
      default:
        throw new Error('Tipo de relatório inválido');
    }
  }
}
