import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from '../interfaces/use-service.interface';
import { USER_REPOSITORY } from '@common/tokens/repositories.tokens';
import { UserRepository } from '@modules/user/infrastructure/repository/user.repository';
import { UserHelper } from '../helpers/user.helper';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    private readonly userHelper: UserHelper,
  ) {}
}
