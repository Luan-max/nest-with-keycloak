import { Transactions } from '@prisma/client';
import { Transaction } from '../entities/transaction.entity';

export abstract class TransactionRepository {
  abstract create(data: Transaction, tenant_id: string): Promise<Transactions>;
  abstract list(tenant_id: string): Promise<Transactions[]>;
}
