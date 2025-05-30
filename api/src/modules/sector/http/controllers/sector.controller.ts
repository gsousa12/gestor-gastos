import { config } from '@common/configuration/config';
import { createApiResponse } from '@common/utils/api-response';
import { CreateSectorRequestDto } from '@modules/sector/core/application/dto/request/create-sector.request.dto';
import { SectorMapper } from '@modules/sector/core/application/mappers/sector.mapper';
import { SectorService } from '@modules/sector/core/application/services/sector.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('sector')
export class SectorController {
  constructor(
    private readonly sectorService: SectorService,
    private readonly sectorMapper: SectorMapper,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/')
  @HttpCode(HttpStatus.OK)
  async createSector(@Body() request: CreateSectorRequestDto) {
    const sector = await this.sectorMapper.toMapperCreateSectorRequest(request);
    const createdSector = await this.sectorService.createSector(sector);
    const response = await this.sectorMapper.toMapperCreateSectorResponse(createdSector);
    return createApiResponse('Setor cadastrado com sucesso', response);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getSectorList(@Query('page') page: number = 1, @Query('name') name: string | undefined) {
    const limit = 12;

    const { sectorList, meta } = await this.sectorService.getSectorList(page, limit, name);
    const response = await this.sectorMapper.toMapperGetSectorListResponse(sectorList);
    return createApiResponse('Lista de setores', response, meta);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getSectorById(@Param('id') id: number) {
    const sectorId = Number(id);

    const sector = await this.sectorService.getSectorById(sectorId);
    const response = await this.sectorMapper.toMapperGetSectorByIdResponse(sector);
    return createApiResponse('Setor encontrado com sucesso', response);
  }
}
