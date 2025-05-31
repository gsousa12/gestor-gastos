import { validationMessages } from '@common/utils/validation-message';
import { IsNumber, IsString, Length } from 'class-validator';

export class CreateSubSectorRequestDto {
  @IsString({ message: validationMessages.isString })
  @Length(3, 40, { message: validationMessages.Length })
  name: string;

  @IsNumber({}, { message: validationMessages.isNumber })
  sectorId: number;
}
