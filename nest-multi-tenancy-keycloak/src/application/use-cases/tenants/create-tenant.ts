import { Injectable } from '@nestjs/common';
import { Tenant as TenantEntity } from '../../entities/tenant.entity';
import { TenantRepository } from '../../repositories/tenant.repository';
import { Tenants } from '@prisma/client';

interface CreateTenantRequestRequest {
  subdomain: string;
  name: string;
  secretKey: string;
  publicKey: string;
}

@Injectable()
export class CreateTenant {
  constructor(private tenantRepository: TenantRepository) {}

  async execute(
    createTenantRequestRequest: CreateTenantRequestRequest,
    user,
  ): Promise<Tenants> {
    const { name, secretKey, subdomain, publicKey } = createTenantRequestRequest;

    const tenant = new TenantEntity({
      name,
      secretKey,
      subdomain,
      publicKey,
    });

    const isMaster = user.resource_access.account.roles.some(
      (role) => role === 'manage-account',
    );

    if (!isMaster) throw new Error('Forbidden');

    const save = await this.tenantRepository.create(tenant);

    return save;
  }
}
