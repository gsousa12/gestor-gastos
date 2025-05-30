import { validationMessages } from '@common/utils/validation-message';
import { IsString, Length } from 'class-validator';

export class CreateSecretaryRequestDto {
  @IsString({ message: validationMessages.isString })
  @Length(3, 50, { message: validationMessages.Length })
  name: string;
}
