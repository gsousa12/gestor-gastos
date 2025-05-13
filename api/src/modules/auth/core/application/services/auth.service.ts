import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IAuthService } from '../../domain/interfaces/auth-service.interface';
import { AUTH_REPOSITORY } from '@common/tokens/repositories.tokens';
import { AuthRepository } from '@modules/auth/infrastructure/repositories/auth.repository';
import { AuthHelper } from '../helpers/auth.helper';
import { LoginRequestDto } from '../dtos/request/login.request.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { User } from '@prisma/client';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(AUTH_REPOSITORY) private readonly authRepository: AuthRepository,
    private readonly authHelper: AuthHelper,
    private readonly jwtService: JwtService,
  ) {}

  async login(request: LoginRequestDto, res: Response): Promise<void> {
    const user = await this.validateUser(request.email, request.password);

    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      isActive: user.isActive,
    };
    const access_token = this.jwtService.sign(payload);
    await this.authHelper.implementsCookies(access_token, res);
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.authRepository.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException('Não existe nenhum usuário registrado com esse email.');
    }
    const isValidPassword = await this.authHelper.comparePassword(password, user.password);
    if (!isValidPassword) {
      throw new BadRequestException('Senha inválida');
    }
    return user;
  }

  async logout(res: Response): Promise<void> {
    await this.authHelper.clearCookies(res);
  }
}
