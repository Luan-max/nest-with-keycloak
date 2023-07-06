import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../repositories/transaction.repository';
import { Transactions, User } from '@prisma/client';
import { UserRepository } from 'src/application/repositories/user.repository';
import { TenantRepository } from 'src/application/repositories/tenant.repository';

@Injectable()
export class ListTransaction {
  constructor(
    private transactionRepository: TransactionRepository,
    private userRepository: UserRepository,
    private tenantRepository: TenantRepository,
  ) {}

  async execute(admin: any): Promise<Transactions[]> {
    const user = await this.userRepository.findOneByEmail(admin.email);
    const tenant = await this.tenantRepository.findByTenantId(user.tenant_id);

    const list = await this.transactionRepository.list(String(tenant.id));

    return list;
  }
}
