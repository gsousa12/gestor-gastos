import { Inject, Injectable } from '@nestjs/common';
import { IDashboardService } from '../interfaces/dashboard-service.interface';
import { DashboardHelper } from '../helpers/dashboard.helper';
import { DASHBOARD_REPOSITORY } from '@common/tokens/repositories.tokens';
import { DashboardRepository } from '@modules/dashboard/infrastructure/repository/dashboard.repository';
import { DashboardData, PaginationMeta } from '@common/structures/types';

@Injectable()
export class DashboardService implements IDashboardService {
  constructor(
    @Inject(DASHBOARD_REPOSITORY) private readonly dashboardRepository: DashboardRepository,
    private readonly dashboardHelper: DashboardHelper,
  ) {}

  async getDashboardData(month: number, year: string): Promise<{ dashboardData: DashboardData[] }> {
    const { dashboardData } = await this.dashboardRepository.getDashboardData(month);

    return !dashboardData || dashboardData.length === 0
      ? { dashboardData: [] }
      : {
          dashboardData,
        };
  }
}
