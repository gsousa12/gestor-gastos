import { Sector } from '@prisma/client';
import { SectorEntity } from '../../domain/entities/sector.entity';
import { PaginationMeta } from '@common/structures/types';

export interface ISectorService {
  // Creates
  createSector(sector: SectorEntity): Promise<Sector>;

  // Gets
  getSectorList(
    page: number,
    limit: number,
    name: string | undefined,
  ): Promise<{ sectorList: Sector[] | []; meta: PaginationMeta }>;
  getSectorById(sectorId: number): Promise<Sector>;
}
