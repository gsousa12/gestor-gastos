import { SecretaryEntity } from '@modules/secretary/core/domain/entity/secretary.entity';
import { Secretary } from '@prisma/client';

export interface ISecretaryRepository {
  createSecretary(secretary: SecretaryEntity): Promise<void>;
}
