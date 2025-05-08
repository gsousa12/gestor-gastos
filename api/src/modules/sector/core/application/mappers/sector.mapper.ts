import { Sector } from '@prisma/client';
import { SectorEntity } from '../../domain/entities/sector.entity';
import { CreateSectorRequestDto } from '../dto/request/create-sector.request.dto';

export class SectorMapper {
  async toMapperCreateSectorRequest(request: CreateSectorRequestDto): Promise<SectorEntity> {
    const sector = new SectorEntity();
    sector.name = request.name;
    sector.description = request.description;
    return sector;
  }

  async toMapperCreateSectorResponse(createdSector: Sector): Promise<SectorEntity> {
    const response = new SectorEntity();
    response.name = createdSector.name;
    response.description = createdSector.description;
    return response;
  }

  async toMapperGetSectorListResponse(createdSector: Sector[]): Promise<SectorEntity[]> {
    return createdSector.map((sector) => {
      const response = new SectorEntity();
      response.id = sector.id;
      response.name = sector.name;
      response.description = sector.description;
      response.createdAt = sector.createdAt;
      response.updatedAt = sector.updatedAt;
      return response;
    });
  }

  async toMapperGetSectorByIdResponse(sector: Sector): Promise<SectorEntity> {
    const response = new SectorEntity();
    response.name = sector.name;
    response.description = sector.description;
    response.createdAt = sector.createdAt;
    response.updatedAt = sector.updatedAt;
    return response;
  }
}
