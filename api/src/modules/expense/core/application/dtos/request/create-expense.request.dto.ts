import { validationMessages } from '@common/utils/validation-message';
import { IsDefined, IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class CreateExpenseRequestDto {
  @IsDefined()
  @IsString({ message: validationMessages.isString })
  @Length(3, 50, { message: validationMessages.Length })
  description: string | null;

  @IsNumber({}, { message: validationMessages.isNumber })
  @Min(1, { message: validationMessages.Min })
  @Max(12, { message: validationMessages.Max })
  month: number;

  @IsString({ message: validationMessages.isString })
  year: string;

  @IsNumber({}, { message: validationMessages.isNumber })
  @Min(100, { message: validationMessages.Min })
  amount: number;

  @IsNumber({}, { message: validationMessages.isNumber })
  supplierId: number;

  @IsNumber({}, { message: validationMessages.isNumber })
  secretaryId: number;

  @IsNumber({}, { message: validationMessages.isNumber })
  userId: number;

  @IsNumber({}, { message: validationMessages.isNumber })
  subsectorId: number;
}
