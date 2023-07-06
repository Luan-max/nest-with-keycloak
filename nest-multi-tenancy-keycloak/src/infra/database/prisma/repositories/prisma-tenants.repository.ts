import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { Tenant } from 'src/application/entities/tenant.entity';
import { TenantRepository } from 'src/application/repositories/tenant.repository';
import { Tenants } from '@prisma/client';

import { Tenants as RawTenants } from '@prisma/client';

export class PrismaTenantsMapper {
  static toPrisma(data: Tenants) {
    return {
      subdomain: data.subdomain,
      name: data.name,
      secretKey: data.secretKey,
      publicKey: data.publicKey,
    };
  }

  static toDomain(data: RawTenants): Tenant {
    return new Tenant(
      {
        subdomain: data.subdomain,
        name: data.name,
        secretKey: data.secretKey,
        publicKey: data.publicKey,
      },
      data.id,
    );
  }
}

@Injectable()
export class PrismaTenantRepository implements TenantRepository {
  constructor(private prisma: PrismaService) {}

  async create(tenant: Tenant): Promise<Tenants> {
    const prismaTenantData = PrismaTenantsMapper.toPrisma(tenant);

    const save = await this.prisma.tenants.create({
      data: prismaTenantData,
    });

    return save;
  }
}
