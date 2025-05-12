import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { ReportEntity } from '../../domain/entities/report.entity';
import { IReportStrategy } from '../interfaces/report-strategy.interface';
import { ReportHelper } from '../helpers/report.helper';
import { convertCentsToReal, getMonthName } from '@common/utils/conversion';

export class PaymentReportStrategy implements IReportStrategy {
  constructor(private readonly reportHelper: ReportHelper) {}

  buildDocumentDefinition(data: any[], report: ReportEntity): TDocumentDefinitions {
    // 1. Agrupar pagamentos por setor
    const setoresMap = new Map<string, any[]>();
    data.forEach((payment) => {
      const sectorName = payment.sector?.name || 'Setor não informado';
      if (!setoresMap.has(sectorName)) {
        setoresMap.set(sectorName, []);
      }
      setoresMap.get(sectorName)!.push(payment);
    });

    const content: any[] = [
      { text: `Relatório de Pagamentos - ${getMonthName(report.month)} - ${report.year}`, style: 'header' },
      { text: '\n' },
    ];

    setoresMap.forEach((payments, sectorName) => {
      content.push({ text: sectorName, style: 'sectorHeader', margin: [0, 10, 0, 4] });

      const tableBody = [
        [
          { text: 'Fornecedor', style: 'tableHeader' },
          { text: 'Descrição', style: 'tableHeader' },
          { text: 'Dívida recorrente', style: 'tableHeader' },
          { text: 'Dívida mês atual', style: 'tableHeader' },
          { text: 'Valor pago', style: 'tableHeader' },
          { text: 'Saldo devedor restante', style: 'tableHeader' },
        ],
      ];

      // Linhas da tabela
      payments.forEach((payment) => {
        // Dívida mês atual
        let dividaMesAtual = payment.supplier?.recurringDebit ?? 0;
        if (payment.recurringDebitDeductedType === 'incremento') {
          dividaMesAtual += payment.recurringDebitDeducted ?? 0;
        } else if (payment.recurringDebitDeductedType === 'dedução') {
          dividaMesAtual -= payment.recurringDebitDeducted ?? 0;
        }

        // Saldo devedor restante (exemplo: dívida mês atual - valor pago)
        const saldoDevedorRestante = dividaMesAtual + -(payment.amount ?? 0);

        tableBody.push([
          payment.supplier?.name ?? '',
          payment.expense?.description ?? '',
          payment.supplier?.recurringDebit != null
            ? `R$ ${convertCentsToReal(payment.supplier.recurringDebit).toFixed(2)}`
            : '',
          `R$ ${convertCentsToReal(dividaMesAtual).toFixed(2)}`,
          payment.amount != null ? `R$ ${convertCentsToReal(payment.amount).toFixed(2)}` : '',
          `R$ ${convertCentsToReal(saldoDevedorRestante).toFixed(2)}`,
        ]);
      });

      content.push({
        table: {
          widths: ['*', '*', 'auto', 'auto', 'auto', 'auto'],
          body: tableBody,
        },
        layout: 'lightHorizontalLines',
        margin: [0, 0, 0, 0],
        style: 'tableContent',
      });
    });

    return {
      content,
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        sectorHeader: {
          fontSize: 14,
          bold: true,
          color: '#2d4154',
        },
        tableHeader: {
          bold: true,
          fillColor: '#eeeeee',
        },
        tableContent: {
          fontSize: 12, // diminua conforme necessário
        },
      },
      pageMargins: [10, 10, 10, 10],
    };
  }
}
