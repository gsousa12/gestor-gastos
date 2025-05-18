import { DashboardData, PaginationMeta } from '@common/structures/types';

export interface IDashboardService {
  getDashboardData(month?: number): Promise<{ dashboardData: DashboardData[] }>;
}
