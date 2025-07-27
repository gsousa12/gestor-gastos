import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
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
  @Type(() => Number)
  @IsNumber({}, { message: validationMessages.isNumber })
  id?: number;

  @IsString({ message: validationMessages.isString })
  @Length(1, 100, { message: validationMessages.Length })
  name: string;

  @IsOptional()
  @IsString({ message: validationMessages.isString })
  @Length(0, 255, { message: validationMessages.Length })
  description?: string | null;

  @IsOptional()
  @Type(() => Number)
  ci?: number;

  @Type(() => Number)
  @IsNumber({}, { message: validationMessages.isNumber })
  @Min(0.01, { message: 'A quantidade deve ser maior que zero.' })
  quantity: number;

  @Type(() => Number)
  @IsInt({ message: 'O valor total deve ser um número inteiro (centavos).' })
  @Min(100, { message: 'O valor total mínimo é de R$ 1,00.' })
  totalValue: number;

  @IsString({ message: validationMessages.isString })
  @IsNotEmpty({ message: 'A unidade de medida é obrigatória.' })
  unitOfMeasure: string;
}

export class CreateExpenseRequestDto {
  @IsOptional()
  @IsString({ message: validationMessages.isString })
  @Length(3, 50, { message: validationMessages.Length })
  description: string | null;

  @Type(() => Number)
  @IsNumber({}, { message: validationMessages.isNumber })
  @Min(1, { message: validationMessages.Min })
  @Max(12, { message: validationMessages.Max })
  month: number;

  @IsString({ message: validationMessages.isString })
  year: string;

  @Type(() => Number)
  @IsNumber({}, { message: validationMessages.isNumber })
  supplierId: number;

  @Type(() => Number)
  @IsNumber({}, { message: validationMessages.isNumber })
  secretaryId: number;

  @Type(() => Number)
  @IsNumber({}, { message: validationMessages.isNumber })
  userId: number;

  @Type(() => Number)
  @IsNumber({}, { message: validationMessages.isNumber })
  subsectorId: number;

  @IsArray()
  @ArrayMinSize(1, { message: 'O campo items deve conter ao menos 1 item' })
  @ValidateNested({ each: true })
  @Type(() => CreateExpenseItemDto)
  items: CreateExpenseItemDto[];
}
