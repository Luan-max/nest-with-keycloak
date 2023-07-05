import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { Transactions } from '@prisma/client';
import { JwtGuard } from 'src/auth/auth/jwt.guard';

@Controller('transactions')
@UseGuards(JwtGuard)
export class TransactionsController {
    constructor(private service: TransactionsService) {}

    @Post()
    create(@Body() data: CreateTransactionDTO, @Req() req): Promise<Transactions> {
      return this.service.create(data, req.user);
    }

    @Get()
    list(@Req() req): Promise<Transactions[]> {
      return this.service.list(req.user);
    }
}
