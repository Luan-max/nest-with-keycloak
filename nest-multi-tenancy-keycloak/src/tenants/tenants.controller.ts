import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { CreateTenantDTO } from './dtos/create-tenant.dto';
import { Tenants } from '@prisma/client';
import { JwtGuard } from 'src/auth/auth/jwt.guard';

@Controller('tenants')
@UseGuards(JwtGuard)
export class TenantsController {
  constructor(private readonly service: TenantsService) {}

  @Post()
  create(@Body() data: CreateTenantDTO, @Req() req): Promise<Tenants> {
    return this.service.create(data, req.user);
  }
}
