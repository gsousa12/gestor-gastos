import { SECTOR_REPOSITORY } from '@common/tokens/repositories.tokens';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ISectorService } from '../interfaces/sector-service.interface';
import { SectorRepository } from '@modules/sector/infrastructure/repositories/sector.repository';
import { SectorHelper } from '../helpers/sector.helper';
import { Sector } from '@prisma/client';
import { SectorEntity } from '../../domain/entities/sector.entity';
import { PaginationMeta } from '@common/structures/types';

@Injectable()
export class SectorService implements ISectorService {
  constructor(
    @Inject(SECTOR_REPOSITORY) private readonly sectorRepository: SectorRepository,
    // private readonly sectorHelper: SectorHelper,
  ) {}

  async createSector(sector: SectorEntity): Promise<Sector> {
    const existingSector = await this.sectorRepository.getSectorByName(sector.name);
    if (existingSector) {
      throw new BadRequestException('Já existe um setor cadastrado com esse nome');
    }
    const createdSector = await this.sectorRepository.createSector(sector);
    return createdSector;
  }

  async getSectorList(
    page: number,
    limit: number,
    name: string | undefined,
  ): Promise<{ sectorList: Sector[] | []; meta: PaginationMeta }> {
    const { sectorList: sectorList, meta } = await this.sectorRepository.getSectorList(page, limit, name);

    return !sectorList || sectorList.length === 0
      ? { sectorList: [], meta }
      : {
          sectorList,
          meta,
        };
  }

  async getSectorById(sectorId: number): Promise<Sector> {
    const sector = await this.sectorRepository.getSectorById(sectorId);
    if (!sector) {
      throw new BadRequestException('Setor não encontrado');
    }

    return sector;
  }
}
