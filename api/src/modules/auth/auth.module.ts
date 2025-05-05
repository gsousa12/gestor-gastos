import { Module } from '@nestjs/common';
import { AuthController } from './http/controllers/auth.controller';
import { AUTH_REPOSITORY } from '@common/tokens/repositories.tokens';
import { AuthRepository } from './infrastructure/repositories/auth.repository';
import { AuthService } from './core/application/services/auth.service';
import { BcryptAdapter } from '@common/adapters/bcrypt.adapter';
import { PrismaService } from '@common/modules/prisma/service/prisma.service';
import { AuthHelper } from './core/application/helpers/auth.helper';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: AUTH_REPOSITORY,
      useClass: AuthRepository,
    },
    AuthService,
    BcryptAdapter,
    AuthHelper,
    PrismaService,
  ],
  exports: [JwtModule, PassportModule],
})
export class AuthModule {}
