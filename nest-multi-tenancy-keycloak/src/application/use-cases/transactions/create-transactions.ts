import { Injectable } from '@nestjs/common';
import { Transaction } from '../../entities/transaction.entity';
import { TransactionRepository } from '../../repositories/transaction.repository';
import { Transactions, User } from '@prisma/client';

interface CreateTransactionRequestRequest {
  brand: string;
  type: string;
  amount: string;
}

@Injectable()
export class CreateTransaction {
  constructor(private transactionRepository: TransactionRepository) {}

  async execute(
    createTransactionRequestRequest: CreateTransactionRequestRequest,
  ): Promise<Transactions> {
    const { amount,brand,type } = createTransactionRequestRequest;

    const transaction = new Transaction({
      amount,
      brand,
      type,
    });

    const save = await this.transactionRepository.create(transaction);

    return save;
  }
}
