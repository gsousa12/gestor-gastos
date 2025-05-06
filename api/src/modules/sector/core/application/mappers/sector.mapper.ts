import { Sector } from '@prisma/client';
import { SectorEntity } from '../../domain/entities/sector.entity';
import { CreateSectorRequestDto } from '../dto/request/create-sector.request.dto';
import { CreateSectorResponseDto } from '../../domain/dtos/response/create-sector.response.dto';
import { GetSectorListResponseDto } from '../../domain/dtos/response/get-sector-list.response.dto';
import { GetSectorByIdResponseDto } from '../../domain/dtos/response/get-sector-id.response.dto';

export class SectorMapper {
  async toMapperCreateSectorRequest(request: CreateSectorRequestDto): Promise<SectorEntity> {
    const sector = new SectorEntity();
    sector.name = request.name;
    sector.description = request.description;
    return sector;
  }

  async toMapperCreateSectorResponse(createdSector: Sector): Promise<CreateSectorResponseDto> {
    const response = new CreateSectorResponseDto();
    response.name = createdSector.name;
    response.description = createdSector.description;
    return response;
  }

  async toMapperGetSectorListResponse(createdSector: Sector[]): Promise<GetSectorListResponseDto[]> {
    return createdSector.map((sector) => {
      const response = new GetSectorListResponseDto();
      response.id = sector.id;
      response.name = sector.name;
      response.description = sector.description;
      response.createdAt = sector.createdAt;
      response.updatedAt = sector.updatedAt;
      return response;
    });
  }

  async toMapperGetSectorByIdResponse(sector: Sector): Promise<GetSectorByIdResponseDto> {
    const response = new GetSectorListResponseDto();
    response.name = sector.name;
    response.description = sector.description;
    response.createdAt = sector.createdAt;
    response.updatedAt = sector.updatedAt;
    return response;
  }
}
