import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private http: HttpService) {}

  async login(username: string, password: string) {
    const { data } = await firstValueFrom(
      this.http.post(
        'http://localhost:8080/auth/realms/studing/protocol/openid-connect/token',
        new URLSearchParams({
          client_id: 'nest',
          client_secret: '702bcd77-1c3f-47fe-b1a0-065666dc04d7',
          grant_type: 'password',
          username,
          password,
        }),
      ),
    );
    return data;
  }
}