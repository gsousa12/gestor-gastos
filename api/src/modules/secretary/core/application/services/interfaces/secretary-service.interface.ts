import { SecretaryEntity } from '@modules/secretary/core/domain/entity/secretary.entity';

export interface ISecretaryService {
  createSecretary(secretary: SecretaryEntity): Promise<void>;
}
