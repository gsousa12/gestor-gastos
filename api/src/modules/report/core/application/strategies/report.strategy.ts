import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { ReportEntity } from '../../domain/entities/report.entity';
import { IReportStrategy } from '../interfaces/report-strategy.interface';
import { ReportHelper } from '../helpers/report.helper';
import { convertCentsToReal, getMonthName } from '@common/utils/conversion';
import { truncateText } from '@common/utils/reports-functions';

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

    // Cabeçalho institucional (sem imagem)
    const header = [
      {
        columns: [
          {
            stack: [
              { text: 'Prefeitura Municipal de Independência - CE', style: 'prefeitura' },
              { text: 'Equipe de Gestão de Gastos', style: 'secretaria' },
            ],
            alignment: 'left',
          },
          {
            text: `Emitido em: ${new Date().toLocaleDateString('pt-BR')}`,
            alignment: 'right',
            style: 'dataEmissao',
          },
        ],
        columnGap: 10,
        margin: [0, 0, 0, 8],
      },
      {
        text: `Relatório de Pagamentos - ${getMonthName(report.month)} / ${report.year}`,
        style: 'tituloRelatorio',
        alignment: 'center',
        margin: [0, 0, 0, 4],
      },
      {
        canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1.2, lineColor: '#2d4154' }],
        margin: [0, 0, 0, 10],
      },
    ];

    const content: any[] = [...header];

    // Para resumo totalizador
    let resumoTotalPago = 0;
    let resumoTotalSaldo = 0;

    setoresMap.forEach((payments, sectorName, map) => {
      let totalValorPago = 0;
      let totalSaldoDevedor = 0;

      const tableBody = [
        [
          { text: 'Fornecedor', style: 'tableHeader', alignment: 'center' },
          { text: 'Descrição', style: 'tableHeader', alignment: 'center' },
          { text: 'Valor da despesa (R$)', style: 'tableHeader', alignment: 'center' },
          { text: 'Valor pago (R$)', style: 'tableHeader', alignment: 'center' },
          { text: 'Saldo devedor restante (R$)', style: 'tableHeader', alignment: 'center' },
        ],
      ];

      payments.forEach((payment) => {
        const valorDespesa = payment.expense?.amount ?? 0;
        const valorPago = payment.amount ?? 0;
        const saldoDevedorRestante = valorDespesa - valorPago;

        totalValorPago += valorPago;
        totalSaldoDevedor += saldoDevedorRestante;

        tableBody.push([
          { text: truncateText(payment.supplier?.name ?? '', 15), style: 'tableContent', alignment: 'right' },
          {
            text: truncateText(payment.expense?.description ?? '', 10),
            style: 'tableContent',
            alignment: 'right',
          },
          { text: convertCentsToReal(valorDespesa), style: 'tableContent', alignment: 'right' },
          {
            text: valorPago ? convertCentsToReal(valorPago) : '-',
            style: 'tableContent',
            alignment: 'right',
          },
          { text: convertCentsToReal(saldoDevedorRestante), style: 'tableContent', alignment: 'right' },
        ]);
      });

      // Linha de totais do setor
      tableBody.push([
        { text: '', colSpan: 2, border: [false, true, false, false] } as any,
        {} as any,
        {
          text: 'Totais do setor:',
          style: 'tableTotalLabel',
          alignment: 'right',
          border: [false, true, false, false],
        } as any,
        {
          text: convertCentsToReal(totalValorPago),
          style: 'tableTotalValue',
          fillColor: '#22c55e',
          color: '#fff',
          alignment: 'right',
          border: [true, true, true, true],
        } as any,
        {
          text: convertCentsToReal(totalSaldoDevedor),
          style: 'tableTotalValue',
          fillColor: '#ef4444',
          color: '#fff',
          alignment: 'right',
          border: [true, true, true, true],
        } as any,
      ]);

      resumoTotalPago += totalValorPago;
      resumoTotalSaldo += totalSaldoDevedor;

      content.push(
        {
          text: `Setor - ${sectorName}`,
          style: 'sectorHeader',
          margin: [0, 18, 0, 6],
        },
        {
          table: {
            widths: [110, '*', 110, 110, 110],
            body: tableBody,
          },
          layout: {
            fillColor: (rowIndex: number) => {
              if (rowIndex === 0) return '#e5e7eb'; // header
              if (rowIndex === tableBody.length - 1) return '#f1f5f9'; // total
              return rowIndex % 2 === 0 ? '#f9fafb' : null; // zebra
            },
            hLineWidth: (i: number, node: any) => (i === 0 || i === node.table.body.length ? 1.2 : 0.5),
            vLineWidth: () => 0.5,
            hLineColor: () => '#cbd5e1',
            vLineColor: () => '#cbd5e1',
          },
          margin: [0, 0, 0, 0],
        },
        // Linha divisória entre setores, exceto no último
        map.size > 1 && Array.from(map.keys()).pop() !== sectorName
          ? {
              canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 0.8, lineColor: '#d1d5db' }],
              margin: [0, 18, 0, 0],
            }
          : null,
      );
    });

    // Resumo totalizador ao final
    content.push(
      {
        text: 'Resumo Geral',
        style: 'resumoHeader',
        margin: [0, 24, 0, 6],
      },
      {
        columns: [
          {
            width: '*',
            text: '',
          },
          {
            width: 'auto',
            table: {
              body: [
                [
                  {
                    text: 'Total Pago',
                    style: 'resumoLabel',
                    alignment: 'right',
                    fillColor: '#22c55e',
                    color: '#fff',
                  } as any,
                  { text: convertCentsToReal(resumoTotalPago), style: 'resumoValue', alignment: 'right' },
                ],
                [
                  {
                    text: 'Saldo Devedor',
                    style: 'resumoLabel',
                    alignment: 'right',
                    fillColor: '#ef4444',
                    color: '#fff',
                  } as any,
                  { text: convertCentsToReal(resumoTotalSaldo), style: 'resumoValue', alignment: 'right' },
                ],
              ],
              widths: [90, 90],
            },
            layout: 'noBorders',
          },
        ],
      },
    );

    return {
      content,
      styles: {
        prefeitura: {
          fontSize: 13,
          bold: true,
          color: '#2d4154',
        },
        secretaria: {
          fontSize: 11,
          color: '#64748b',
        },
        dataEmissao: {
          fontSize: 9,
          color: '#64748b',
        },
        tituloRelatorio: {
          fontSize: 16,
          bold: true,
          color: '#2563eb',
          margin: [0, 8, 0, 0],
        },
        sectorHeader: {
          fontSize: 13,
          bold: true,
          color: '#2563eb',
          margin: [0, 12, 0, 4],
        },
        tableHeader: {
          fontSize: 11,
          bold: true,
          color: '#2d4154',
          fillColor: '#e5e7eb',
        },
        tableContent: {
          fontSize: 10,
          color: '#22223b',
        },
        tableTotalLabel: {
          fontSize: 11,
          bold: true,
          color: '#2d4154',
        },
        tableTotalValue: {
          fontSize: 11,
          bold: true,
        },
        resumoHeader: {
          fontSize: 13,
          bold: true,
          color: '#2d4154',
        },
        resumoLabel: {
          fontSize: 11,
          bold: true,
        },
        resumoValue: {
          fontSize: 12,
          bold: true,
        },
      },
      defaultStyle: {
        // font: 'Roboto',
      },
      pageMargins: [32, 32, 32, 32],
      pageSize: 'A4',
    };
  }
}

export class ExpenseReportStrategy implements IReportStrategy {
  constructor(private readonly reportHelper: ReportHelper) {}

  buildDocumentDefinition(data: any[], report: ReportEntity): TDocumentDefinitions {
    // 1. Extrair secretarias únicas na ordem de aparição
    const secretarias: string[] = [];
    data.forEach((expense) => {
      const secretariaName = expense.secretary?.name || ' - ';
      if (!secretarias.includes(secretariaName)) {
        secretarias.push(secretariaName);
      }
    });

    // 2. Agrupar expenses por setor
    const setoresMap = new Map<string, any[]>();
    data.forEach((expense) => {
      const setorName = expense.subsector?.sector?.name || 'Setor não informado';
      if (!setoresMap.has(setorName)) {
        setoresMap.set(setorName, []);
      }
      setoresMap.get(setorName)!.push(expense);
    });

    // 3. Cabeçalho institucional (igual ao de pagamentos, mas com fonte maior)
    const header = [
      {
        columns: [
          {
            stack: [
              { text: 'Prefeitura Municipal de Independência - CE', style: 'prefeitura' },
              { text: 'Equipe de Gestão de Gastos', style: 'secretaria' },
            ],
            alignment: 'left',
          },
          {
            text: `Emitido em: ${new Date().toLocaleDateString('pt-BR')}`,
            alignment: 'right',
            style: 'dataEmissao',
          },
        ],
        columnGap: 10,
        margin: [0, 0, 0, 8],
      },
      {
        text: `Relatório de Despesas - ${getMonthName(report.month)} / ${report.year}`,
        style: 'tituloRelatorio',
        alignment: 'center',
        margin: [0, 0, 0, 4],
      },
      {
        canvas: [{ type: 'line', x1: 0, y1: 0, x2: 770, y2: 0, lineWidth: 1.2, lineColor: '#2d4154' }],
        margin: [0, 0, 0, 10],
      },
    ];

    const content: any[] = [...header];

    // Para o bloco de soma total
    let totalGeral = 0;
    const totalPorSecretaria: Record<string, number> = {};
    secretarias.forEach((sec) => (totalPorSecretaria[sec] = 0));

    // 4. Para cada setor, montar o bloco/tabela
    setoresMap.forEach((expenses, setorName) => {
      // Mapear suppliers únicos desse setor
      const suppliersMap = new Map<string, any[]>();
      expenses.forEach((expense) => {
        const supplierName = expense.supplier?.name || ' - ';
        if (!suppliersMap.has(supplierName)) {
          suppliersMap.set(supplierName, []);
        }
        suppliersMap.get(supplierName)!.push(expense);
      });

      if (suppliersMap.size === 0) return;

      // Cabeçalho da tabela
      const tableHeader = [
        { text: 'Fornecedor', style: 'tableHeader', alignment: 'center' },
        { text: 'Valor Total', style: 'tableHeader', alignment: 'center' },
        ...secretarias.map((sec) => ({
          text: sec,
          style: 'tableHeader',
          alignment: 'center',
        })),
      ];

      const tableBody = [tableHeader];

      // Linhas da tabela
      suppliersMap.forEach((supplierExpenses, supplierName) => {
        const totalAmount = supplierExpenses.reduce((sum, exp) => sum + (exp.amount ?? 0), 0);
        totalGeral += totalAmount;

        const secretariaCells = secretarias.map((secName) => {
          const soma = supplierExpenses
            .filter((exp) => (exp.secretary?.name || ' - ') === secName)
            .reduce((sum, exp) => sum + (exp.amount ?? 0), 0);
          totalPorSecretaria[secName] += soma;
          return {
            text: soma > 0 ? `R$ ${convertCentsToReal(soma)}` : ' - ',
            style: 'tableContent',
            alignment: 'right',
          };
        });

        tableBody.push([
          { text: supplierName, style: 'tableContent', alignment: 'left' },
          { text: `R$ ${convertCentsToReal(totalAmount)}`, style: 'tableContent', alignment: 'right' },
          ...secretariaCells,
        ]);
      });

      // Adiciona bloco do setor ao conteúdo
      content.push(
        {
          text: `Setor - '${setorName}'`,
          style: 'sectorHeader',
          margin: [0, 10, 0, 3],
        },
        {
          table: {
            widths: [
              100, // Fornecedor
              70, // Valor Total
              ...secretarias.map(() => 60), // Secretarias (width reduzido)
            ],
            body: tableBody,
          },
          layout: {
            fillColor: (rowIndex: number) => {
              if (rowIndex === 0) return '#e5e7eb'; // header
              return rowIndex % 2 === 0 ? '#f9fafb' : null; // zebra
            },
            hLineWidth: (i: number, node: any) => (i === 0 || i === node.table.body.length ? 1.2 : 0.5),
            vLineWidth: () => 0.5,
            hLineColor: () => '#cbd5e1',
            vLineColor: () => '#cbd5e1',
          },
          margin: [0, 0, 0, 0],
        },
      );
    });

    // 5. Bloco de soma total ao final
    const totalTableHeader = [
      { text: 'Total Geral', style: 'tableHeader', alignment: 'center' },
      { text: 'Valor Total', style: 'tableHeader', alignment: 'center' },
      ...secretarias.map((sec) => ({
        text: sec,
        style: 'tableHeader',
        alignment: 'center',
      })),
    ];

    const totalTableBody = [
      totalTableHeader,
      [
        { text: '', style: 'tableContent' },
        {
          text: `R$ ${convertCentsToReal(totalGeral)}`,
          style: 'tableContent',
          alignment: 'right',
          bold: true,
        },
        ...secretarias.map((sec) => ({
          text: totalPorSecretaria[sec] > 0 ? `R$ ${convertCentsToReal(totalPorSecretaria[sec])}` : ' - ',
          style: 'tableContent',
          alignment: 'right',
          bold: true,
        })),
      ],
    ];

    content.push(
      {
        text: 'Soma Total',
        style: 'sectorHeader',
        margin: [0, 16, 0, 3],
      },
      {
        table: {
          widths: [
            100, // label
            70, // Valor Total
            ...secretarias.map(() => 60), // Secretarias
          ],
          body: totalTableBody,
        },
        layout: {
          fillColor: (rowIndex: number) => {
            if (rowIndex === 0) return '#e5e7eb'; // header
            return '#f1f5f9'; // total
          },
          hLineWidth: (i: number, node: any) => (i === 0 || i === node.table.body.length ? 1.2 : 0.5),
          vLineWidth: () => 0.5,
          hLineColor: () => '#cbd5e1',
          vLineColor: () => '#cbd5e1',
        },
        margin: [0, 0, 0, 0],
      },
    );

    // 6. Retornar o documentDefinition
    return {
      content,
      styles: {
        prefeitura: {
          fontSize: 12,
          bold: true,
          color: '#2d4154',
        },
        secretaria: {
          fontSize: 10,
          color: '#64748b',
        },
        dataEmissao: {
          fontSize: 7,
          color: '#64748b',
        },
        tituloRelatorio: {
          fontSize: 12,
          bold: true,
          color: '#2563eb',
          margin: [0, 3, 0, 0],
        },
        sectorHeader: {
          fontSize: 8,
          bold: true,
          color: '#2563eb',
          margin: [0, 5, 0, 2],
        },
        tableHeader: {
          fontSize: 8,
          bold: true,
          color: '#2d4154',
          fillColor: '#e5e7eb',
        },
        tableContent: {
          fontSize: 8,
          color: '#22223b',
        },
      },
      defaultStyle: {},
      pageMargins: [10, 10, 10, 10],
      pageSize: 'A4',
      pageOrientation: 'landscape',
    };
  }
}
