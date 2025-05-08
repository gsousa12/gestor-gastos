import { config } from '@common/configuration/config';
import { CreateApiResponse } from '@common/utils/api-response';
import { MainErrorResponse } from '@common/utils/main-error-response';
import { CreateSectorRequestDto } from '@modules/sector/core/application/dto/request/create-sector.request.dto';
import { SectorMapper } from '@modules/sector/core/application/mappers/sector.mapper';
import { SectorService } from '@modules/sector/core/application/services/sector.service';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, Request } from '@nestjs/common';

@Controller('sector')
export class SectorController {
  constructor(
    private readonly sectorService: SectorService,
    private readonly sectorMapper: SectorMapper,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.OK)
  async createSector(@Body() request: CreateSectorRequestDto, @Request() req) {
    try {
      const sector = await this.sectorMapper.toMapperCreateSectorRequest(request);
      const createdSector = await this.sectorService.createSector(sector);
      const response = await this.sectorMapper.toMapperCreateSectorResponse(createdSector);
      return CreateApiResponse('Setor cadastrado com sucesso', response);
    } catch (error) {
      console.log(error);

      return MainErrorResponse(error);
    }
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getSectorList(@Query('page') page: number = 1, @Query('name') name: string | undefined) {
    const limit = config.PAGINATION.LIST_PAGE_LIMIT;

    try {
      const { sectorList, meta } = await this.sectorService.getSectorList(page, limit, name);
      const response = await this.sectorMapper.toMapperGetSectorListResponse(sectorList);
      return CreateApiResponse('Lista de setores', response, meta);
    } catch (error) {
      return MainErrorResponse(error);
    }
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getSectorById(@Request() req, @Param('id') id: number) {
    const sectorId = Number(id);
    try {
      const sector = await this.sectorService.getSectorById(sectorId);
      const response = await this.sectorMapper.toMapperGetSectorByIdResponse(sector);
      return CreateApiResponse('Setor encontrado com sucesso', response);
    } catch (error) {
      return MainErrorResponse(error);
    }
  }
}
