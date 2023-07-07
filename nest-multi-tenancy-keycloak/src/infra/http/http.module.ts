import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TenantsController } from '../http/controllers/tenant.controller';
import { CreateTenant } from 'src/application/use-cases/tenants/create-tenant';
import { CreateUser } from 'src/application/use-cases/users/create-user';
import { UserController } from './controllers/user.controller';
import { TransactionController } from './controllers/transaction.controller';
import { CreateTransaction } from 'src/application/use-cases/transactions/create-transactions';
import { ListTransaction } from 'src/application/use-cases/transactions/list-transactions';
import { KeycloakService } from './services/keycloak/keycloak.service';
import { HttpModule as HttpModuleAxios } from '@nestjs/axios';

@Module({
  imports: [DatabaseModule, HttpModuleAxios],
  controllers: [TenantsController, UserController, TransactionController],
  providers: [
    CreateTenant,
    CreateUser,
    CreateTransaction,
    ListTransaction,
    KeycloakService,
  ],
})
export class HttpModule {}
