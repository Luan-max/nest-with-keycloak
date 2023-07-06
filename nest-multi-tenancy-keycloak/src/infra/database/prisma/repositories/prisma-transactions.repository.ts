import { Transactions } from '@prisma/client';
import { User } from 'src/application/entities/user.entity';
import { UserRepository } from 'src/application/repositories/user.repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { TransactionRepository } from 'src/application/repositories/transaction.repository';
import { Transaction } from 'src/application/entities/transaction.entity';
import { GetResult } from '@prisma/client/runtime';

export class PrismaUsersMapper {
  static toPrisma(data: Transaction) {
    return {
      type: data.type,
      amount: data.amount,
      brand: data.brand,
    };
  }
}

@Injectable()
export class PrismaTransactionRepository implements TransactionRepository {
  constructor(private prisma: PrismaService) {}
  async list(tenant_id): Promise<Transactions[]> {
    const list = await this.prisma.transactions.findMany({
      where: { tenant_id },
    });

    return list;
  }

  async create(data: Transaction, tenant_id): Promise<Transactions> {
    const prismaTransactionData = PrismaUsersMapper.toPrisma(data);

    const save = await this.prisma.transactions.create({
      data: { ...prismaTransactionData, tenant_id },
    });

    return save;
  }
}
