import { createApiResponse } from '@common/utils/api-response';
import { CreateSubSectorRequestDto } from '@modules/sector/core/application/dto/request/create-subsector.request.dto';
import { SectorMapper } from '@modules/sector/core/application/mappers/sector.mapper';
import { SectorService } from '@modules/sector/core/application/services/sector.service';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
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
    const subsector = this.sectorMapper.toMapperCreateSubSectorRequest(request);
    const createdSubSector = await this.sectorService.createSubSector(subsector);
    const response = this.sectorMapper.toMapperCreateSubSectorResponse(createdSubSector);
    return createApiResponse('Sub-Setor cadastrado com sucesso', response);
  }

  // TODO - Implementar a paginação
  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getSubSectorListBySectorId(@Param('id') id: number) {
    const sectorId = Number(id);

    const subSectorList = await this.sectorService.getSubSectorListBySectorId(sectorId);
    const response = this.sectorMapper.toMapperGetSubSectorListBySectorIdResponse(subSectorList);
    return createApiResponse('Sub-Setor encontrado com sucesso', response);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('soft-delete/:id')
  @HttpCode(HttpStatus.OK)
  async softDeleteSubSectorById(@Param('id') id: number) {
    const subSectorId = Number(id);

    await this.sectorService.softDeleteSubSectorById(subSectorId);
    return null;
  }
}
