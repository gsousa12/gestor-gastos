export interface IReportRepository {
  getDataForReport(type: string, month: number, year: string): Promise<any[]>;
}
