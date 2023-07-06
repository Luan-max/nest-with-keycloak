import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { TenantRepository } from 'src/application/repositories/tenant.repository';
import { PrismaTenantRepository } from './prisma/repositories/prisma-tenants.repository';
import { UserRepository } from 'src/application/repositories/user.repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-users.repository';
import { TransactionRepository } from 'src/application/repositories/transaction.repository';
import { PrismaTransactionRepository } from './prisma/repositories/prisma-transactions.repository';

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
    {
      provide: TransactionRepository,
      useClass: PrismaTransactionRepository,
    },
  ],
  exports: [TenantRepository, UserRepository, TransactionRepository],
})
export class DatabaseModule {}
