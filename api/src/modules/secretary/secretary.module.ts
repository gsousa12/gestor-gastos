import { Module } from '@nestjs/common';
import { SECRETARY_REPOSITORY } from '@common/tokens/repositories.tokens';
import { SecretaryController } from './http/controllers/secretary.controller';
import { SecretaryRepository } from './infrastructure/repositories/secretary.repository';
import { SecretaryService } from './core/application/services/secretary.service';
import { PrismaService } from '@common/modules/prisma/service/prisma.service';
import { SecretaryMapper } from './core/application/mappers/secretary.mapper';

@Module({
  imports: [],
  controllers: [SecretaryController],
  providers: [
    {
      provide: SECRETARY_REPOSITORY,
      useClass: SecretaryRepository,
    },
    SecretaryService,
    PrismaService,
    SecretaryMapper,
  ],
  exports: [],
})
export class SecretaryModule {}
