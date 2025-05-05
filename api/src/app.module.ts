import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config';
import { HealthController } from './health.controller';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
