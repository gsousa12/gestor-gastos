import { createApiResponse } from '@common/utils/api-response';
import { mainErrorResponse } from '@common/utils/main-error-response';
import { SectorMapper } from '@modules/sector/core/application/mappers/sector.mapper';
import { SectorService } from '@modules/sector/core/application/services/sector.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

@Controller('subSector')
export class SubSectorController {
  constructor(
    private readonly sectorService: SectorService,
    private readonly sectorMapper: SectorMapper,
  ) {}

  //   @Post('/')
  //   @HttpCode(HttpStatus.OK)
  //   async createSubSector(@Body() request: CreateSubSectorRequestDto) {
  //     try {
  //       const subsector = await this.sectorMapper.toMapperCreateSubSectorRequest(request);
  //       const createdSubSector = await this.sectorService.createSubSector(subsector);
  //       const response = await this.sectorMapper.toMapperCreateSubSectorResponse(createdSubSector);
  //       return createApiResponse('Sub-Setor cadastrado com sucesso', response);
  //     } catch (error) {
  //       return mainErrorResponse(error);
  //     }
  //   }
}
