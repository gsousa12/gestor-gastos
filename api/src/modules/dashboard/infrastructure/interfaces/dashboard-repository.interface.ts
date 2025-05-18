import { DashboardData, PaginationMeta } from '@common/structures/types';

export interface IDashboardRepository {
  getDashboardData(month: number): Promise<{ dashboardData: DashboardData[] }>;
}
