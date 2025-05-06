import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './health.controller';
import { AuthModule } from '@modules/auth/auth.module';
import { SupplierModule } from '@modules/supplier/supplier.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    SupplierModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
