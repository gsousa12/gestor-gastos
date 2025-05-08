import { validateTaxIdRegex, validationMessages } from '@common/utils/validation-message';
import { IsDefined, IsEmail, IsString, Length, Matches } from 'class-validator';

export class CreateSupplierRequestDto {
  @IsString({ message: validationMessages.isString })
  @Length(3, 30, { message: validationMessages.Length })
  name: string;

  @IsDefined()
  @IsString({ message: validationMessages.isString })
  @Length(3, 30, { message: validationMessages.Length })
  companyName: string | null;

  @IsDefined()
  @IsString({ message: validationMessages.isString })
  @Matches(validateTaxIdRegex, {
    message: validationMessages.taxId,
  })
  taxId: string | null;

  @IsDefined()
  @IsString({ message: validationMessages.isString })
  @IsEmail({}, { message: validationMessages.isEmail })
  contactEmail: string | null;

  @IsDefined()
  @IsString({ message: validationMessages.isString })
  contactPhone: string | null;
}
