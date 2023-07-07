import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

@Injectable()
export class SecretProviderService {
  constructor(private prisma: PrismaService) {}

  async getSecret(email: string): Promise<string> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    const secret = await this.prisma.tenants.findFirst({
      where: { id: Number(user?.tenant_id) },
    });
    return secret?.publicKey;
  }
}
