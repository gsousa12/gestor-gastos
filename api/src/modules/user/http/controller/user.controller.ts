import { createApiResponse } from '@common/utils/api-response';
import { UserMapper } from '@modules/user/core/application/mappers/user.mapper';
import { UserService } from '@modules/user/core/application/services/user.service';
import { Controller, Get, HttpCode, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userMapper: UserMapper,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/get-user-info')
  @HttpCode(HttpStatus.OK)
  async getUserInfo(@Req() request: Request) {
    return createApiResponse('Usuário encontrado com sucesso', request.user!);
  }
}
