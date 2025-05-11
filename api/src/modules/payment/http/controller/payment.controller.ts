import { config } from '@common/configuration/config';
import { createApiResponse } from '@common/utils/api-response';
import { mainErrorResponse } from '@common/utils/main-error-response';
import { CreatePaymentRequestDto } from '@modules/payment/core/application/dtos/request/create-payment.request.dto';
import { PaymentMapper } from '@modules/payment/core/application/mappers/payment.mapper';
import { PaymentService } from '@modules/payment/core/application/services/payment.service';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';

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
      return createApiResponse('Pagamento cancelado com sucesso', response);
    } catch (error) {
      return mainErrorResponse(error);
    }
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getPaymentList(
    @Query('page') page: number = 1,
    @Query('supplierName') supplierName: string | undefined,
    @Query('mouth') mouth: number | undefined,
    @Query('year') year: string | undefined,
  ) {
    const limit = config.PAGINATION.LIST_PAGE_LIMIT;
    try {
      const { paymentList, meta } = await this.paymentService.getPaymentList(
        page,
        limit,
        supplierName,
        mouth,
        year,
      );
      const response = await this.paymentMapper.toMapperGetPaymentListResponse(paymentList);
      return createApiResponse('Lista de pagamentos', response, meta);
    } catch (error) {
      return mainErrorResponse(error);
    }
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getPaymentById(@Param('id') id: number) {
    const paymentId = Number(id);
    try {
      const payment = await this.paymentService.getPaymentById(paymentId);
      const response = await this.paymentMapper.toMapperGetPaymentByIdResponse(payment);
      return createApiResponse('Pagamento encontrado com sucesso', response);
    } catch (error) {
      return mainErrorResponse(error);
    }
  }
}
