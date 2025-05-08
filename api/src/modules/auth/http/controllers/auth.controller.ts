import { CreateApiResponse } from '@common/utils/api-response';
import { MainErrorResponse } from '@common/utils/main-error-response';
import { LoginRequestDto } from '@modules/auth/core/application/dtos/request/login.request.dto';
import { AuthService } from '@modules/auth/core/application/services/auth.service';
import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';

import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() request: LoginRequestDto, @Res({ passthrough: true }) res: Response) {
    try {
      await this.authService.login(request, res);
      return CreateApiResponse('Logado com sucesso', {});
    } catch (error) {
      return MainErrorResponse(error);
    }
  }
}
