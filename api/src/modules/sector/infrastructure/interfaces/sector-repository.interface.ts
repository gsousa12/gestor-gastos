import { PaginationMeta } from '@common/structures/types';
import { SectorEntity } from '@modules/sector/core/domain/entities/sector.entity';
import { SubSectorEntity } from '@modules/sector/core/domain/entities/subsector.entity';
import { Sector, SubSector } from '@prisma/client';

export interface ISectorRepository {
  // Creates
  createSector(sector: SectorEntity): Promise<Sector>;
  createSubSector(subsector: SubSectorEntity): Promise<SubSector>;
  // Gets
  getSectorList(
    page: number,
    limit: number,
    name: string | undefined,
  ): Promise<{ sectorList: Sector[] | []; meta: PaginationMeta }>;
  getSectorById(sectorId: number): Promise<Sector | null>;
  getSectorByName(name: string): Promise<Sector | null>;
  getSubSectorByName(name: string): Promise<SubSector | null>;
}
