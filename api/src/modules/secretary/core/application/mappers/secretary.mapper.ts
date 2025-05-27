import { Secretary } from '@prisma/client';
import { SecretaryEntity } from '../../domain/entity/secretary.entity';
import { CreateSecretaryRequestDto } from '../dtos/request/create-secretary.request.dto';

export class SecretaryMapper {
  toMapperCreateSecretaryRequest(request: CreateSecretaryRequestDto): SecretaryEntity {
    const secretary = new SecretaryEntity();
    secretary.name = request.name;
    return secretary;
  }

  toMapperGetSecretaryListResponse(secretaryList: Secretary[]): SecretaryEntity[] {
    return secretaryList.map((secretary) => {
      const response = new SecretaryEntity();
      response.id = secretary.id;
      response.name = secretary.name;
      return response;
    });
  }
}
