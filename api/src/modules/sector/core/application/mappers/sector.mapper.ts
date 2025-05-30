import { Sector, SubSector } from '@prisma/client';
import { SectorEntity } from '../../domain/entities/sector.entity';
import { CreateSectorRequestDto } from '../dto/request/create-sector.request.dto';
import { SubSectorEntity } from '../../domain/entities/subsector.entity';
import { CreateSubSectorRequestDto } from '../dto/request/create-subsector.request.dto';

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

  toMapperCreateSubSectorRequest(request: CreateSubSectorRequestDto): SubSectorEntity {
    const subSector = new SubSectorEntity();
    subSector.name = request.name;
    subSector.sectorId = request.sectorId;
    return subSector;
  }

  toMapperCreateSubSectorResponse(createdSubSector: SubSector): SubSectorEntity {
    const response = new SubSectorEntity();
    response.name = createdSubSector.name;
    response.sectorId = createdSubSector.sectorId;
    return response;
  }

  toMapperGetSubSectorListBySectorIdResponse(subSectorList: SubSector[]): SubSectorEntity[] {
    return subSectorList.map((subSector) => {
      const response = new SubSectorEntity();
      response.id = subSector.id;
      response.name = subSector.name;
      return response;
    });
  }
}
