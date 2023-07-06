import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TenantsController } from '../http/controllers/tenant.controller';
import { CreateTenant } from 'src/application/use-cases/tenants/create-tenant';
import { CreateUser } from 'src/application/use-cases/users/create-user';
import { UserController } from './controllers/user.controller';
import { TransactionController } from './controllers/transaction.controller';
import { CreateTransaction } from 'src/application/use-cases/transactions/create-transactions';

@Module({
  imports: [DatabaseModule],
  controllers: [TenantsController, UserController, TransactionController],
  providers: [CreateTenant, CreateUser, CreateTransaction],
})
export class HttpModule {}