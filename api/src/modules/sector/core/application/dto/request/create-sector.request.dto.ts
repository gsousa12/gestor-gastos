import { validationMessages } from '@common/utils/validation-message';
import { IsOptional, IsString, Length } from 'class-validator';

export class CreateSectorRequestDto {
  @IsString({ message: validationMessages.isString })
  @Length(3, 20, { message: validationMessages.Length })
  name: string;

  @IsOptional()
  @IsString({ message: validationMessages.isString })
  @Length(3, 30, { message: validationMessages.Length })
  description: string | null;
}
