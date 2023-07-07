import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtStrategyService } from './jwt-strategy/jwt-strategy.service';
import { PrismaService } from '../database/prisma/prisma.service';
import { SecretProviderService } from './jwt-strategy/secret-provider.service';

@Module({
  imports: [
    HttpModule,
    JwtModule.register({
      signOptions: {
        expiresIn: '100s',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategyService, PrismaService, SecretProviderService],
})
export class AuthModule {}