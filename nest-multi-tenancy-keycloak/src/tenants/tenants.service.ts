import { Injectable, ExecutionContext } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTenantDTO } from './dtos/create-tenant.dto';
import { Tenants } from '@prisma/client';

@Injectable()
export class TenantsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTenantDTO, user): Promise<Tenants> {
    const isMaster = user.resource_access.account.roles.some(
      (role) => role === 'manage-account',
    );

    if (!isMaster) throw new Error('Forbidden');

    const save = await this.prisma.tenants.create({
      data: {
        subdomain: data.subdomain,
        name: data.name,
      },
    });

    return save;
  }
}
