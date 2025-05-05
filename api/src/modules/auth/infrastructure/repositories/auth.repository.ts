import { Injectable } from '@nestjs/common';
import { IAuthRepository } from '../interfaces/auth-repository.interface';
import { PrismaService } from '@common/modules/prisma/service/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmail(email: string): Promise<User | null> {
    const user = this.prisma.user.findUnique({
      where: { email },
    });
    return user;
  }
}
