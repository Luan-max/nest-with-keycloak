import { Injectable } from '@nestjs/common';
import { Transaction } from '../../entities/transaction.entity';
import { TransactionRepository } from '../../repositories/transaction.repository';
import { Transactions, User } from '@prisma/client';
import { TenantRepository } from 'src/application/repositories/tenant.repository';
import { UserRepository } from 'src/application/repositories/user.repository';

interface CreateTransactionRequestRequest {
  brand: string;
  type: string;
  amount: string;
}

@Injectable()
export class CreateTransaction {
  constructor(
    private transactionRepository: TransactionRepository,
    private userRepository: UserRepository,
    private tenantRepository: TenantRepository,
  ) {}

  async execute(
    createTransactionRequestRequest: CreateTransactionRequestRequest,
    admin,
  ): Promise<Transactions> {
    const user = await this.userRepository.findOneByEmail(admin.email);
    const tenant = await this.tenantRepository.findByTenantId(user.tenant_id);

    const { amount, brand, type } = createTransactionRequestRequest;

    const transaction = new Transaction({
      amount,
      brand,
      type,
    });

    const save = await this.transactionRepository.create(
      transaction,
      String(tenant.id),
    );

    return save;
  }
}
