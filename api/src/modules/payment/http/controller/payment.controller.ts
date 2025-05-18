import { config } from '@common/configuration/config';
import { createApiResponse } from '@common/utils/api-response';
import { CreatePaymentRequestDto } from '@modules/payment/core/application/dtos/request/create-payment.request.dto';
import { PaymentMapper } from '@modules/payment/core/application/mappers/payment.mapper';
import { PaymentService } from '@modules/payment/core/application/services/payment.service';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly paymentMapper: PaymentMapper,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/')
  @HttpCode(HttpStatus.OK)
  async createPayment(@Body() request: CreatePaymentRequestDto) {
    const payment = this.paymentMapper.toMapperCreatePaymentRequest(request);
    const createdPayment = await this.paymentService.createPayment(payment);
    const response = this.paymentMapper.toMapperCreatePaymentResponse(createdPayment);
    return createApiResponse('Pagamento cadastrado com sucesso', response);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/cancel/:id')
  @HttpCode(HttpStatus.OK)
  async cancelPayment(@Param('id') id: number) {
    const paymentId = Number(id);

    const canceledPayment = await this.paymentService.cancelPaymentById(paymentId);
    const response = this.paymentMapper.toMapperCancelPaymentResponse(canceledPayment);
    return createApiResponse('Pagamento cancelado com sucesso', response);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getPaymentList(
    @Query('page') page: number | undefined,
    @Query('supplierName') supplierName: string | undefined,
    @Query('month') month: number | undefined,
    @Query('year') year: string | undefined,
  ) {
    const limit = config.PAGINATION.LIST_PAGE_LIMIT;
    const parsedPage = page ? Number(page) : 1;
    const parserdMonth = month ? Number(month) : new Date().getMonth() + 1;

    const { paymentList, meta } = await this.paymentService.getPaymentList(
      parsedPage,
      limit,
      supplierName,
      parserdMonth,
      year,
    );
    const response = await this.paymentMapper.toMapperGetPaymentListResponse(paymentList);
    return createApiResponse('Lista de pagamentos', response, meta);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getPaymentById(@Param('id') id: number) {
    const paymentId = Number(id);

    const payment = await this.paymentService.getPaymentById(paymentId);
    const response = await this.paymentMapper.toMapperGetPaymentByIdResponse(payment);
    return createApiResponse('Pagamento encontrado com sucesso', response);
  }
}
