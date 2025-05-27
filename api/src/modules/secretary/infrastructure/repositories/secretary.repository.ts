import { PrismaService } from '@common/modules/prisma/service/prisma.service';
import { ISecretaryRepository } from './interfaces/secretary-rerpository.interface';
import { SecretaryEntity } from '@modules/secretary/core/domain/entity/secretary.entity';
import { Secretary } from '@prisma/client';
import { PaginationMeta } from '@common/structures/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SecretaryRepository implements ISecretaryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createSecretary(secretary: SecretaryEntity): Promise<void> {
    await this.prisma.secretary.create({
      data: {
        name: secretary.name,
        createdAt: new Date(),
      },
    });
  }

  async getSecretaryList(
    page: number,
    limit: number,
  ): Promise<{ secretaryList: Secretary[]; meta: PaginationMeta }> {
    const skip = (page - 1) * limit;

    const whereClause: any = {
      deletedAt: null,
    };

    const [secretaryList, totalCount] = await Promise.all([
      this.prisma.secretary.findMany({
        where: whereClause,
        skip,
        take: limit,
      }),
      this.prisma.secretary.count({
        where: whereClause,
      }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      secretaryList: secretaryList,
      meta: {
        totalItems: totalCount,
        itemsPerPage: limit,
        currentPage: page,
        totalPages,
      },
    };
  }
}
