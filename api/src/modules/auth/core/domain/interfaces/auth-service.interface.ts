import { User } from '@prisma/client';
import { LoginRequestDto } from '../../application/dtos/request/login.request.dto';
import { Response } from 'express';

export interface IAuthService {
  login(request: LoginRequestDto, res: Response): Promise<void>;
  validateUser(email: string, password: string): Promise<User>;
}
