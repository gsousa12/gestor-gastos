import { validateTaxIdRegex, validationMessages } from '@common/utils/validation-message';
import { Allow, IsDefined, IsEmail, IsOptional, IsString, Length, Matches } from 'class-validator';

export class CreateSupplierRequestDto {
  @IsString({ message: validationMessages.isString })
  @Length(3, 30, { message: validationMessages.Length })
  name: string;

  @IsOptional()
  @IsString({ message: validationMessages.isString })
  @Length(3, 30, { message: validationMessages.Length })
  companyName: string | null;

  @IsOptional()
  @IsString({ message: validationMessages.isString })
  @Matches(validateTaxIdRegex, {
    message: validationMessages.taxId,
    always: false,
  })
  taxId: string | null;

  @IsOptional()
  @IsString({ message: validationMessages.isString })
  @IsEmail({}, { message: validationMessages.isEmail })
  contactEmail: string | null;

  @IsOptional()
  @IsString({ message: validationMessages.isString })
  contactPhone: string | null;
}
