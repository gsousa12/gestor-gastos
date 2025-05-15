import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { config } from '@common/configuration/config';
import { SingleErrorPipe } from '@common/pipes/single-error.pipe';
import { DelayInterceptor } from '@common/interceptors/delay.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new SingleErrorPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors({
    origin: config.CLIENT_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
    exposedHeaders: ['Content-Disposition'],
  });

  const logger = new Logger('Bootstrap');
  const port = config.PORT;

  //app.useGlobalInterceptors(new DelayInterceptor());
  app.setGlobalPrefix('api');
  app.use(cookieParser());

  await app.listen(port);
  logger.log(`Server running on port: ${port}`);
}
bootstrap();
