import { validationMessages } from '@common/utils/validation-message';
import { IsNumber, Min } from 'class-validator';

export class CreatePaymentRequestDto {
  @IsNumber({}, { message: validationMessages.isNumber })
  @Min(100, { message: validationMessages.Min })
  amount: number;

  @IsNumber({}, { message: validationMessages.isNumber })
  expenseId: number;
}
