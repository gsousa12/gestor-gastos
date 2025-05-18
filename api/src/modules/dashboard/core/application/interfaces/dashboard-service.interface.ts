import { DashboardData, PaginationMeta } from '@common/structures/types';

export interface IDashboardService {
  getDashboardData(month: number, year: string): Promise<{ dashboardData: DashboardData[] }>;
}
