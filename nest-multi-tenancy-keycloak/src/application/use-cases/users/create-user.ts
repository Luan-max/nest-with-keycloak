import { Injectable } from '@nestjs/common';
import { User as UserEntity } from '../../entities/user.entity';
import { UserRepository } from '../../repositories/user.repository';
import { User } from '@prisma/client';

interface CreateUserRequestRequest {
  username: string;
  email: string;
  password: string;
  tenant_id: string;
}

@Injectable()
export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(
    createUserRequestRequest: CreateUserRequestRequest,
  ): Promise<User> {
    const { email, password, tenant_id, username } = createUserRequestRequest;

    const user = new UserEntity({
      email,
      password,
      tenant_id,
      username,
    });

    const save = await this.userRepository.create(user);

    return save;
  }
}
