import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class KeycloakService {
  constructor(private http: HttpService) {}

  async createUser(user: any, token): Promise<any> {
    const userKeyCloak = {
      username: user.username,
      enabled: true,
      emailVerified: false,
      firstName: user.username,
      lastName: user.username,
      email: user.email,
      credentials: [
        {
          type: 'password',
          value: user.password,
          temporary: false,
        },
      ],
    };
    
    const { data } = await firstValueFrom(
      this.http.post(
        `http://localhost:8080/auth/admin/realms/studing/users`,
        userKeyCloak,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      ),
    );

    return data;
  }
}
