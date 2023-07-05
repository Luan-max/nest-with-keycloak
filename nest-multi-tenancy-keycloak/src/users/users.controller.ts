import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/auth/auth/jwt.guard';

@Controller('users')
@UseGuards(JwtGuard)
export class UsersController {
  constructor(private service: UsersService) {}

  @Post()
  create(@Body() data: CreateUserDTO, @Req() req): Promise<User> {
    return this.service.create(data, req.user);
  }
}
