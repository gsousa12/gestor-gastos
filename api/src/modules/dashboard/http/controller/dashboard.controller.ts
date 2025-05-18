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

  // TODO: Adicionar o year como parâmetro de filtragem
  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getDashboardData(@Query('month') month: number, @Query('year') year: string) {
    const getMonth = month ? Number(month) : new Date().getMonth() + 1;
    const { dashboardData } = await this.dashboardService.getDashboardData(getMonth, year);
    return createApiResponse('Informações do dashboard', dashboardData);
  }
}
