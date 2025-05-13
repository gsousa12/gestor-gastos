import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { ReportEntity } from '../../domain/entities/report.entity';
import { IReportStrategy } from '../interfaces/report-strategy.interface';
import { ReportHelper } from '../helpers/report.helper';
import { convertCentsToReal, getMonthName } from '@common/utils/conversion';

export class PaymentReportStrategy implements IReportStrategy {
  constructor(private readonly reportHelper: ReportHelper) {}

  buildDocumentDefinition(data: any[], report: ReportEntity): TDocumentDefinitions {
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
          { text: 'Fornecedor', style: 'tableHeader', valign: 'middle' },
          { text: 'Descrição', style: 'tableHeader', valign: 'middle' },
          { text: 'Débito mês anterior (R$)', style: 'tableHeader', valign: 'middle' },
          { text: 'Débito mês atual (R$)', style: 'tableHeader', valign: 'middle' },
          { text: 'Valor pago (R$)', style: 'tableHeader', valign: 'middle' },
          { text: 'Saldo devedor restante (R$)', style: 'tableHeader', valign: 'middle' },
        ],
      ];

      let totalValorPago = 0;
      let totalSaldoDevedor = 0;

      payments.forEach((payment) => {
        const dividaRecorrente = payment.supplier?.recurringDebit ?? 0;
        const dividaMesAtual = payment.expense?.amount ?? 0;
        const saldoDevedorRestante = dividaRecorrente + dividaMesAtual - (payment.amount ?? 0);

        totalValorPago += payment.amount ?? 0;
        totalSaldoDevedor += saldoDevedorRestante;

        tableBody.push([
          { text: payment.supplier?.name ?? '', style: 'tableContent', valign: 'middle' },
          { text: payment.expense?.description ?? '', style: 'tableContent', valign: 'middle' },
          {
            text:
              payment.supplier?.recurringDebit != null
                ? `${convertCentsToReal(payment.supplier.recurringDebit)}`
                : '',
            style: 'tableContent',
            valign: 'middle',
          },
          { text: `${convertCentsToReal(dividaMesAtual)}`, style: 'tableContent', valign: 'middle' },
          {
            text: payment.amount != null ? `${convertCentsToReal(payment.amount)}` : '',
            style: 'tableContent',
            // fillColor: '#22c55e',
            // color: '#fff',
            valign: 'middle',
          } as any,
          {
            text: `${convertCentsToReal(saldoDevedorRestante)}`,
            style: 'tableContent',
            // fillColor: '#ef4444',
            // color: '#fff',
            valign: 'middle',
          } as any,
        ]);
      });

      tableBody.push([
        { text: '', colSpan: 4, border: [false, true, false, false] },
        {},
        {},
        {},
        {
          text: [
            { text: 'Total:', fontSize: 10, bold: true },
            '\n',
            { text: `${convertCentsToReal(totalValorPago)}`, fontSize: 12, bold: true },
          ],
          style: 'totalCell',
          fillColor: '#22c55e',
          color: '#fff',
          border: [true, true, true, true],
          margin: [0, 2, 0, 2],
        } as any,
        {
          text: [
            { text: 'Total:', fontSize: 10, bold: true },
            '\n',
            { text: `${convertCentsToReal(totalSaldoDevedor)}`, fontSize: 12, bold: true },
          ],
          style: 'totalCell',
          fillColor: '#ef4444',
          color: '#fff',
          border: [true, true, true, true],
          margin: [0, 2, 0, 2],
        } as any,
      ]);

      content.push({
        table: {
          widths: [100, '*', 70, 70, 60, 80],
          body: tableBody,
          // heights: 28,
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
          fontSize: 12,
        },
        totalCell: {
          fontSize: 12,
          bold: true,
        },
      },
      pageMargins: [10, 10, 10, 10],
    };
  }
}
