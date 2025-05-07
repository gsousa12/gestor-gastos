import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@modules/auth/auth.module';
import { SupplierModule } from '@modules/supplier/supplier.module';
import { SectorModule } from '@modules/sector/sector.module';
import { ExpenseModule } from '@modules/expense/expense.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    SupplierModule,
    SectorModule,
    ExpenseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
