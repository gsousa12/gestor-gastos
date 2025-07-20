import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { validationMessages } from '@common/utils/validation-message';

class CreateExpenseItemDto {
  @IsOptional()
  @IsNumber({}, { message: validationMessages.isNumber })
  id?: number;

  @IsString({ message: validationMessages.isString })
  @Length(1, 100, { message: validationMessages.Length })
  name: string;

  @IsOptional()
  @IsString({ message: validationMessages.isString })
  @Length(0, 255, { message: validationMessages.Length })
  description?: string | null;

  @IsInt({ message: validationMessages.isNumber })
  @Min(1, { message: validationMessages.Min })
  quantity: number;

  @IsInt({ message: validationMessages.isNumber })
  @Min(1, { message: validationMessages.Min })
  unitValue: number;
}

export class CreateExpenseRequestDto {
  @IsOptional()
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
  supplierId: number;

  @IsNumber({}, { message: validationMessages.isNumber })
  secretaryId: number;

  @IsNumber({}, { message: validationMessages.isNumber })
  userId: number;

  @IsNumber({}, { message: validationMessages.isNumber })
  subsectorId: number;

  @IsArray({
    message: validationMessages.isArray
      ? validationMessages.isArray
      : (args) => `O campo ${args.property} deve ser um array de itens`,
  })
  @ArrayMinSize(1, { message: 'O campo items deve conter ao menos 1 item' })
  @ValidateNested({ each: true })
  @Type(() => CreateExpenseItemDto)
  items: CreateExpenseItemDto[];
}
