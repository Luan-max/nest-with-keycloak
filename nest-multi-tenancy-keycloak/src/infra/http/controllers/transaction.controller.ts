import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Transactions, User } from '@prisma/client';
import { JwtGuard } from 'src/infra/auth/auth/jwt.guard';
import { CreateTransactionDTO } from '../dtos/create-trasaction.dto';
import { CreateTransaction } from 'src/application/use-cases/transactions/create-transactions';
import { ListTransaction } from 'src/application/use-cases/transactions/list-transactions';

@Controller('transactions')
@UseGuards(JwtGuard)
export class TransactionController {
  constructor(
    private readonly createTransaction: CreateTransaction,
    private readonly listTransaction: ListTransaction,
  ) {}

  @Post()
  create(
    @Body() data: CreateTransactionDTO,
    @Req() req,
  ): Promise<Transactions> {
    return this.createTransaction.execute(data, req.user);
  }

  @Get()
  list(@Req() req): Promise<Transactions[]> {
    return this.listTransaction.execute(req.user);
  }
}
