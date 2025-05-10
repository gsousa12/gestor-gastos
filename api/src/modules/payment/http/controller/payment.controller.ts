import { createApiResponse } from '@common/utils/api-response';
import { mainErrorResponse } from '@common/utils/main-error-response';
import { CreatePaymentRequestDto } from '@modules/payment/core/application/dtos/request/create-payment.request.dto';
import { PaymentMapper } from '@modules/payment/core/application/mappers/payment.mapper';
import { PaymentService } from '@modules/payment/core/application/services/payment.service';
import { Body, Controller, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly paymentMapper: PaymentMapper,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.OK)
  async createPayment(@Body() request: CreatePaymentRequestDto) {
    try {
      const payment = this.paymentMapper.toMapperCreatePaymentRequest(request);
      const createdPayment = await this.paymentService.createPayment(payment);
      const response = this.paymentMapper.toMapperCreatePaymentResponse(createdPayment);
      return createApiResponse('Pagamento cadastrado com sucesso', response);
    } catch (error) {
      return mainErrorResponse(error);
    }
  }

  @Post('/cancel/:id')
  @HttpCode(HttpStatus.OK)
  async cancelPayment(@Param('id') id: number) {
    const paymentId = Number(id);
    try {
      const canceledPayment = await this.paymentService.cancelPaymentById(paymentId);
      const response = this.paymentMapper.toMapperCancelPaymentResponse(canceledPayment);
      return createApiResponse('Pagamento cadastrado com sucesso', response);
    } catch (error) {
      return mainErrorResponse(error);
    }
  }
}
