import { DashboardData, PaginationMeta } from '@common/structures/types';

export interface IDashboardRepository {
  getDashboardData(month: number, year: string): Promise<{ dashboardData: DashboardData[] }>;
}
