import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Tenants } from '@prisma/client';
import { JwtGuard } from 'src/infra/auth/auth/jwt.guard';
import { CreateTenant } from 'src/application/use-cases/tenants/create-tenant';
import { CreateTenantDTO } from '../dtos/create.tenant.dto';

@Controller('tenants')
@UseGuards(JwtGuard)
export class TenantsController {
  constructor(private readonly createTenant: CreateTenant) {}

  @Post()
  create(@Body() data: CreateTenantDTO, @Req() req): Promise<Tenants> {
    return this.createTenant.execute(data, req.user);
  }
}
