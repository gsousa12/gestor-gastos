import { validationMessages } from '@common/utils/validation-message';
import { PaymentStatus } from '@modules/payment/core/domain/enums/payment.enum';
import { IsEnum, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreatePaymentRequestDto {
  @IsNumber({}, { message: validationMessages.isNumber })
  @Min(100, { message: validationMessages.Min })
  amount: number;

  @IsNumber({}, { message: validationMessages.isNumber })
  expenseId: number;
}
