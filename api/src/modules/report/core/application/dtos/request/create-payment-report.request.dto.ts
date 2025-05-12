import { validationMessages } from '@common/utils/validation-message';
import { IsNumber, IsString } from 'class-validator';

export class CreateReportRequestDto {
  @IsString({ message: validationMessages.isString })
  reportType: string;
  @IsNumber({}, { message: validationMessages.isNumber })
  month: number;
  @IsString({ message: validationMessages.isString })
  year: string;
}
