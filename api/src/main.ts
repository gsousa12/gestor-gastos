import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { config } from '@common/configuration/config';
import { SingleErrorPipe } from '@common/pipes/single-error.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new SingleErrorPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const logger = new Logger('Bootstrap');
  const port = config.PORT;

  app.setGlobalPrefix('api');
  app.use(cookieParser());

  await app.listen(port);
  logger.log(`Server running on port: ${port}`);
}
bootstrap();
