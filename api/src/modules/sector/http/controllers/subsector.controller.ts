import { createApiResponse } from '@common/utils/api-response';
import { mainErrorResponse } from '@common/utils/main-error-response';
import { CreateSubSectorRequestDto } from '@modules/sector/core/application/dto/request/create-subsector.request.dto';
import { SectorMapper } from '@modules/sector/core/application/mappers/sector.mapper';
import { SectorService } from '@modules/sector/core/application/services/sector.service';
import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('sub-sector')
export class SubSectorController {
  constructor(
    private readonly sectorService: SectorService,
    private readonly sectorMapper: SectorMapper,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/')
  @HttpCode(HttpStatus.OK)
  async createSubSector(@Body() request: CreateSubSectorRequestDto) {
    try {
      const subsector = this.sectorMapper.toMapperCreateSubSectorRequest(request);
      const createdSubSector = await this.sectorService.createSubSector(subsector);
      const response = this.sectorMapper.toMapperCreateSubSectorResponse(createdSubSector);
      return createApiResponse('Sub-Setor cadastrado com sucesso', response);
    } catch (error) {
      return mainErrorResponse(error);
    }
  }
}
