import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TenantsController } from '../http/controllers/tenant.controller';
import { CreateTenant } from 'src/application/use-cases/tenants/create-tenant';
import { CreateUser } from 'src/application/use-cases/users/create-user';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [TenantsController, UserController],
  providers: [CreateTenant, CreateUser],
})
export class HttpModule {}