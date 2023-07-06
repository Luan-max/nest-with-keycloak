import { User as RawUsers } from '@prisma/client';
import { User } from 'src/application/entities/user.entity';
import { UserRepository } from 'src/application/repositories/user.repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

export class PrismaUsersMapper {
  static toPrisma(data: User) {
    return {
      username: data.username,
      email: data.email,
      password: data.password,
      tenant_id: data.tenant_id,
    };
  }

  static toDomain(data: RawUsers): User {
    return new User(
      {
        username: data.username,
        email: data.email,
        password: data.password,
        tenant_id: data.tenant_id,
      },
      data.id,
    );
  }
}

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: User): Promise<RawUsers> {
    const prismaUserData = PrismaUsersMapper.toPrisma(data);

    const save = await this.prisma.user.create({
      data: prismaUserData,
    });

    return save;
  }
}
