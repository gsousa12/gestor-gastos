import { createApiResponse } from '@common/utils/api-response';
import { DashboardMapper } from '@modules/dashboard/core/application/mappers/dashboard.mapper';
import { DashboardService } from '@modules/dashboard/core/application/services/dashboard.service';
import { Body, Controller, Get, HttpCode, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
    private readonly dashboardMapper: DashboardMapper,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getDashboardData(@Query('month') month: number) {
    const getMonth = month ? Number(month) : new Date().getMonth() + 1;
    const { dashboardData } = await this.dashboardService.getDashboardData(getMonth);
    return createApiResponse('Informações do dashboard', dashboardData);
  }
}
