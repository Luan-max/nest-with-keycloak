import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { TenantRepository } from 'src/application/repositories/tenant.repository';
import { PrismaTenantRepository } from './prisma/repositories/prisma-tenants.repository';
import { UserRepository } from 'src/application/repositories/user.repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-users.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: TenantRepository,
      useClass: PrismaTenantRepository,
    },
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [TenantRepository, UserRepository],
})
export class DatabaseModule {}
