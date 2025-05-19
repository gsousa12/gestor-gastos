import { createApiResponse } from '@common/utils/api-response';
import { LoginRequestDto } from '@modules/auth/core/application/dtos/request/login.request.dto';
import { AuthService } from '@modules/auth/core/application/services/auth.service';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() request: LoginRequestDto, @Res({ passthrough: true }) res: Response) {
    await this.authService.login(request, res);
    return createApiResponse('Logado com sucesso', {});
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response) {
    await this.authService.logout(res);
    return createApiResponse('Deslogado com sucesso', {});
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/get-user-info')
  @HttpCode(HttpStatus.OK)
  async getUserInfo(@Req() req: Request) {
    return createApiResponse('Usuário encontrado com sucesso', req.user!);
  }
}
