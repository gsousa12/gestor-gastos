import { BcryptAdapter } from '@common/adapters/bcrypt.adapter';
import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class AuthHelper {
  constructor(private readonly bcryptAdapter: BcryptAdapter) {}

  async comparePassword(password: string, userPassword: string): Promise<boolean> {
    return await this.bcryptAdapter.compare(password, userPassword);
  }

  async implementsCookies(access_token: string, res: Response) {
    const isProductionEnvironment = process.env.NODE_ENV === 'production';

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: isProductionEnvironment,
      sameSite: isProductionEnvironment ? 'none' : 'lax',
      maxAge: Number(process.env.JWT_MAX_AGE),
    });
  }

  async clearCookies(res: Response) {
    const isProductionEnvironment = process.env.NODE_ENV === 'production';
    res.clearCookie('access_token', {
      httpOnly: true,
      sameSite: isProductionEnvironment ? 'none' : 'lax',
      maxAge: Number(process.env.JWT_MAX_AGE),
    });
  }
}
