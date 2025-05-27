import { config } from '@common/configuration/config';
import { createApiResponse } from '@common/utils/api-response';
import { CreateSecretaryRequestDto } from '@modules/secretary/core/application/dtos/request/create-secretary.request.dto';
import { SecretaryMapper } from '@modules/secretary/core/application/mappers/secretary.mapper';
import { SecretaryService } from '@modules/secretary/core/application/services/secretary.service';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('secretary')
export class SecretaryController {
  constructor(
    private readonly secretaryService: SecretaryService,
    private readonly secretaryMapper: SecretaryMapper,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/')
  @HttpCode(HttpStatus.OK)
  async createSecretary(@Body() request: CreateSecretaryRequestDto) {
    const secretary = this.secretaryMapper.toMapperCreateSecretaryRequest(request);
    await this.secretaryService.createSecretary(secretary);
    return null;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getSecretaryList(@Query('page') page: number = 1) {
    const limit = config.PAGINATION.LIST_PAGE_LIMIT;

    const { secretaryList, meta } = await this.secretaryService.getSecretaryList(page, limit);
    const response = this.secretaryMapper.toMapperGetSecretaryListResponse(secretaryList);
    return createApiResponse('Lista de fornecedores', response, meta);
  }
}
