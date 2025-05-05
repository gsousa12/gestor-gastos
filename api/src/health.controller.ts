import { Controller, Post } from '@nestjs/common';

@Controller()
export class HealthController {
  @Post('/health')
  async check() {
    if (process.env.NODE_ENV === 'development') {
      return { message: 'Api Saudável -> Desenvolvimento' };
    }
    if (process.env.NODE_ENV === 'production') {
      return { message: 'Api Saudável -> Produção' };
    }
    return {};
  }
}
