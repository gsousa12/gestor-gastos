import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { ReportHelper } from '../helpers/report.helper';
import { IReportStrategy } from '../interfaces/report-strategy.interface';
import { ReportEntity } from '../../domain/entities/report.entity';

export class PaymentReportStrategy implements IReportStrategy {
  constructor(private readonly reportHelper: ReportHelper) {}

  buildDocumentDefinition(data: any[], report: ReportEntity): TDocumentDefinitions {
    const body = [
      [
        { text: 'ID', style: 'tableHeader' },
        { text: 'Valor', style: 'tableHeader' },
        { text: 'Data', style: 'tableHeader' },
      ],
      ...data.map((payment) => [payment.id, payment.amount, payment.createdAt]),
    ];

    return {
      content: [
        { text: `Relatório de Pagamentos - ${report.month}/${report.year}`, style: 'header' },
        { text: '\n' },
        {
          table: {
            widths: ['auto', '*', 'auto'],
            body,
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        tableHeader: {
          bold: true,
          fillColor: '#eeeeee',
        },
      },
    };
  }
}
