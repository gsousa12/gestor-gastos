import { Injectable } from '@nestjs/common';
import { ISectorRepository } from '../interfaces/sector-repository.interface';
import { PrismaService } from '@common/modules/prisma/service/prisma.service';
import { SectorEntity } from '@modules/sector/core/domain/entities/sector.entity';
import { Sector } from '@prisma/client';
import { PaginationMeta } from '@common/structures/types';

@Injectable()
export class SectorRepository implements ISectorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createSector(sector: SectorEntity): Promise<Sector> {
    const createdSector = await this.prisma.sector.create({
      data: {
        name: sector.name,
        description: sector.description,
        createdAt: new Date(),
      },
    });

    return createdSector;
  }

  async getSectorList(
    page: number,
    limit: number,
    name: string | undefined,
  ): Promise<{ sectorList: Sector[]; meta: PaginationMeta }> {
    const skip = (page - 1) * limit;

    const whereClause: any = {};

    if (name) {
      whereClause.name = { contains: name, mode: 'insensitive' };
    }

    const [sectorList, totalCount] = await Promise.all([
      this.prisma.sector.findMany({
        where: whereClause,
        skip,
        take: limit,
      }),
      this.prisma.sector.count({
        where: whereClause,
      }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      sectorList: sectorList,
      meta: {
        totalItems: totalCount,
        itemsPerPage: limit,
        currentPage: page,
        totalPages,
      },
    };
  }

  async getSectorById(sectorId: number): Promise<Sector | null> {
    const sector = await this.prisma.sector.findUnique({
      where: {
        id: sectorId,
      },
    });

    return sector;
  }
}
