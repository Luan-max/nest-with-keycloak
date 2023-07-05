import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDTO, user): Promise<User> {
    const subdomain = user.subdomain;
    const tenant = await this.prisma.tenants.findFirst({
      where: {
        subdomain,
      },
    });

    const save = await this.prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        password: data.username,
        tenant_id: String(tenant.id),
      },
    });

    return save;
  }
}
