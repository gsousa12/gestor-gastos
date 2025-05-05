import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { config } from '@common/configuration/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.use(cookieParser());

  const logger = new Logger('Bootstrap');

  const port = config.PORT;

  await app.listen(port);
  logger.log(`Server running on port: ${port}`);
}
bootstrap();
