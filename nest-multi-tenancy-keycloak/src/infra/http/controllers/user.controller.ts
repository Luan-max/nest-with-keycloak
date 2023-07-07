import {
  Body,
  Controller,
  Headers,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/infra/auth/auth/jwt.guard';
import { CreateUser } from 'src/application/use-cases/users/create-user';
import { CreateUserDTO } from '../dtos/create-user.dto';

@Controller('users')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly createUser: CreateUser) {}

  @Post()
  create(
    @Body() data: CreateUserDTO,
    @Req() req,
    @Headers('Authorization') authorization: string,
  ): Promise<User> {
    return this.createUser.execute(data, req.user, authorization);
  }
}
