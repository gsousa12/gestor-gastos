import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@modules/auth/auth.module';
import { SupplierModule } from '@modules/supplier/supplier.module';
import { SectorModule } from '@modules/sector/sector.module';
import { ExpenseModule } from '@modules/expense/expense.module';
import { PaymentModule } from '@modules/payment/payment.module';
import { ReportModule } from '@modules/report/report.module';
import { DashboardModule } from '@modules/dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    SupplierModule,
    SectorModule,
    ExpenseModule,
    PaymentModule,
    ReportModule,
    DashboardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
