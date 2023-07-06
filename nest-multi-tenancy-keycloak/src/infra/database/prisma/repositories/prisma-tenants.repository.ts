import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { Tenant } from 'src/application/entities/tenant.entity';
import { TenantRepository } from 'src/application/repositories/tenant.repository';
import { Tenants } from '@prisma/client';

import { Tenants as RawTenants } from '@prisma/client';
import { GetResult } from '@prisma/client/runtime';

export class PrismaTenantsMapper {
  static toPrisma(data: Tenants) {
    return {
      subdomain: data.subdomain,
      name: data.name,
      secretKey: data.secretKey,
      publicKey: data.publicKey,
    };
  }
}

@Injectable()
export class PrismaTenantRepository implements TenantRepository {
  constructor(private prisma: PrismaService) {}
  async findByTenantId(tenant_id: string): Promise<Tenants> {
    const tenant = await this.prisma.tenants.findFirst({
      where: {
        id: Number(tenant_id),
      },
    });

    return tenant
  }

  async create(tenant: Tenant): Promise<Tenants> {
    const prismaTenantData = PrismaTenantsMapper.toPrisma(tenant);

    const save = await this.prisma.tenants.create({
      data: prismaTenantData,
    });

    return save;
  }
}
