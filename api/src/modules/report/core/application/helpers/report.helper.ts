import { BadRequestException, Injectable } from '@nestjs/common';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

// O correto é acessar pdfFonts.vfs, não pdfFonts.pdfMake.vfs
(pdfMake as any).vfs = (pdfFonts as any).vfs;

@Injectable()
export class ReportHelper {
  constructor() {}

  async generatePdf(documentDefinition: TDocumentDefinitions): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const pdfDocGenerator = pdfMake.createPdf(documentDefinition);

        pdfDocGenerator.getBuffer((buffer: Buffer) => {
          resolve(buffer);
        });
      } catch (error) {
        reject(new BadRequestException('Erro ao gerar o PDF: ' + error.message));
      }
    });
  }
}
