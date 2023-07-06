import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

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
          client_secret: '1f6bd26d-3062-40de-b9ec-85c0b0cdc74c',
          grant_type: 'password',
          username,
          password,
        }),
      ),
    );
    return data;
  }
}
