import { Sector, SubSector } from '@prisma/client';
import { SectorEntity } from '../../domain/entities/sector.entity';
import { PaginationMeta } from '@common/structures/types';
import { SubSectorEntity } from '../../domain/entities/subsector.entity';

export interface ISectorService {
  // Creates
  createSector(sector: SectorEntity): Promise<Sector>;
  createSubSector(subsector: SubSectorEntity): Promise<SubSector>;

  // Gets
  getSectorList(
    page: number,
    limit: number,
    name: string | undefined,
  ): Promise<{ sectorList: Sector[] | []; meta: PaginationMeta }>;
  getSectorById(sectorId: number): Promise<Sector>;
}
