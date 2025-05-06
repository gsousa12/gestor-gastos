import { BcryptAdapter } from '@common/adapters/bcrypt.adapter';
import { config } from '@common/configuration/config';
import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class AuthHelper {
  constructor(private readonly bcryptAdapter: BcryptAdapter) {}

  async comparePassword(password: string, userPassword: string): Promise<boolean> {
    return await this.bcryptAdapter.compare(password, userPassword);
  }

  async implementsCookies(access_token: string, res: Response) {
    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: config.NODE_ENV === 'development' ? false : true,
      sameSite: 'strict',
      maxAge: config.JWT.JWT_MAX_AGE,
    });
  }

  async clearCookies(res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: config.NODE_ENV === 'development' ? false : true,
      sameSite: 'strict',
    });
  }
}
