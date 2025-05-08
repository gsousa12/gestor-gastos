import { validationMessages } from '@common/utils/validation-message';
import { IsEmail, IsString, Length, Min, MinLength } from 'class-validator';

export class LoginRequestDto {
  @IsString({ message: validationMessages.isString })
  @IsEmail({}, { message: validationMessages.isEmail })
  email: string;

  @IsString({ message: validationMessages.isString })
  @Length(6, 20, { message: validationMessages.Length })
  password: string;
}
