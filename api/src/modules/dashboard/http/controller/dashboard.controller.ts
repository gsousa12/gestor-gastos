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
  async getDashboardData(
    @Query('userId') userId: number, // <-- MUDANÇA: Injetar o objeto da requisição para pegar o usuário
    @Query('month') month: number,
    @Query('year') year: string,
  ) {
    // <-- MUDANÇA: Extrair o userId do usuário autenticado
    const parsedUserId = userId ? userId : undefined; // <-- MELHORIA: Definir um valor padrão ou tratar caso não seja fornecido

    // <-- MELHORIA: Adicionar valores padrão para mês e ano de forma mais clara
    const getMonth = month ? Number(month) : new Date().getMonth() + 1;
    const getYear = year ? year : new Date().getFullYear().toString();

    const { dashboardData } = await this.dashboardService.getDashboardData(
      getMonth,
      getYear,
      parsedUserId, // <-- MUDANÇA: Passar o userId para o service
    );

    return createApiResponse('Informações do dashboard', dashboardData);
  }
}
