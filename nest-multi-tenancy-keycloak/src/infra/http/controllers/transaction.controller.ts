import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Transactions, User } from '@prisma/client';
import { JwtGuard } from 'src/infra/auth/auth/jwt.guard';
import { CreateTransactionDTO } from '../dtos/create-trasaction.dto';
import { CreateTransaction } from 'src/application/use-cases/transactions/create-transactions';

@Controller('transactions')
@UseGuards(JwtGuard)
export class TransactionController {
  constructor(private readonly createTransaction: CreateTransaction) {}

  @Post()
  create(@Body() data: CreateTransactionDTO): Promise<Transactions> {
    return this.createTransaction.execute(data);
  }
}
