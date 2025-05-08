import { validationMessages } from '@common/utils/validation-message';
import { IsDefined, IsString, Length } from 'class-validator';

export class CreateSectorRequestDto {
  @IsString({ message: validationMessages.isString })
  @Length(3, 20, { message: validationMessages.Length })
  name: string;

  @IsDefined({ message: validationMessages.isDefined })
  @IsString({ message: validationMessages.isString })
  @Length(3, 50, { message: validationMessages.Length })
  description: string | null;
}
