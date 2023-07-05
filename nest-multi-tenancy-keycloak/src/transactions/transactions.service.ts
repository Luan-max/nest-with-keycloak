import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { Transactions } from '@prisma/client';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTransactionDTO, user): Promise<Transactions> {
    const subdomain = user.subdomain;
    const tenant = await this.prisma.tenants.findFirst({
      where: {
        subdomain,
      },
    });

    const save = await this.prisma.transactions.create({
      data: {
        amount: data.amount,
        type: data.type,
        brand: data.brand,
        tenant_id: String(tenant.id),
      },
    });

    return save;
  }

  async list(user): Promise<Transactions[]> {
    const subdomain = user.subdomain;
    const tenant = await this.prisma.tenants.findFirst({
      where: {
        subdomain,
      },
    });

    const result = await this.prisma.transactions.findMany({
      where: {
        tenant_id: String(tenant.id),
      },
    });

    return result;
  }
}
