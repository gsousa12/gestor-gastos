import { Inject, Injectable } from '@nestjs/common';
import { ISecretaryService } from './interfaces/secretary-service.interface';
import { SECRETARY_REPOSITORY } from '@common/tokens/repositories.tokens';
import { SecretaryEntity } from '../../domain/entity/secretary.entity';
import { SecretaryRepository } from '@modules/secretary/infrastructure/repositories/secretary.repository';
import { Secretary } from '@prisma/client';
import { PaginationMeta } from '@common/structures/types';

@Injectable()
export class SecretaryService implements ISecretaryService {
  constructor(@Inject(SECRETARY_REPOSITORY) private readonly secretaryRepository: SecretaryRepository) {}

  async createSecretary(secretary: SecretaryEntity): Promise<void> {
    await this.secretaryRepository.createSecretary(secretary);
  }

  async getSecretaryList(
    page: number,
    limit: number,
  ): Promise<{ secretaryList: Secretary[] | []; meta: PaginationMeta }> {
    const { secretaryList: secretaryList, meta } = await this.secretaryRepository.getSecretaryList(
      page,
      limit,
    );

    return !secretaryList || secretaryList.length === 0
      ? { secretaryList: [], meta }
      : {
          secretaryList,
          meta,
        };
  }
}
