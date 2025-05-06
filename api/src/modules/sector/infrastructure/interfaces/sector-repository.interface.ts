import { PaginationMeta } from '@common/structures/types';
import { SectorEntity } from '@modules/sector/core/domain/entities/sector.entity';
import { Sector } from '@prisma/client';

export interface ISectorRepository {
  createSector(sector: SectorEntity): Promise<Sector>;
  getSectorList(
    page: number,
    limit: number,
    name: string | undefined,
  ): Promise<{ sectorList: Sector[] | []; meta: PaginationMeta }>;
  getSectorById(sectorId: number): Promise<Sector | null>;
}
