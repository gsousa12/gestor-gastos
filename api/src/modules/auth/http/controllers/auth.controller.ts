import { createApiResponse } from '@common/utils/api-response';
import { mainErrorResponse } from '@common/utils/main-error-response';
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
    try {
      await this.authService.login(request, res);
      return createApiResponse('Logado com sucesso', {});
    } catch (error) {
      return mainErrorResponse(error);
    }
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response) {
    try {
      await this.authService.logout(res);
      return createApiResponse('Deslogado com sucesso', {});
    } catch (error) {
      return mainErrorResponse(error);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/get-user-info')
  @HttpCode(HttpStatus.OK)
  async getUserInfo(@Req() req: Request) {
    try {
      console.log('Teste');

      return createApiResponse('Usuário encontrado com sucesso', req.user!);
    } catch (error) {
      return mainErrorResponse(error);
    }
  }
}
