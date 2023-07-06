import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private http: HttpService, private prisma: PrismaService) {}

  async login(username: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        username,
      },
    });

    const tenant =
      user &&
      (await this.prisma.tenants.findFirst({
        where: { id: Number(user.tenant_id) },
      }));

    const { data } = await firstValueFrom(
      this.http.post(
        `http://localhost:8080/auth/realms/${
          tenant ? tenant.subdomain.toLocaleLowerCase() : 'studing'
        }/protocol/openid-connect/token`,
        new URLSearchParams({
          client_id: 'nest',
          client_secret: tenant
            ? tenant.secretKey
            : '702bcd77-1c3f-47fe-b1a0-065666dc04d7',
          grant_type: 'password',
          username,
          password,
        }),
      ),
    );
    return data;
  }
}
