import { Injectable } from '@nestjs/common';
import { User as UserEntity } from '../../entities/user.entity';
import { UserRepository } from '../../repositories/user.repository';
import { User } from '@prisma/client';
import { KeycloakService } from 'src/infra/http/services/keycloak/keycloak.service';

interface CreateUserRequestRequest {
  username: string;
  email: string;
  password: string;
  tenant_id: string;
}

@Injectable()
export class CreateUser {
  constructor(
    private userRepository: UserRepository,
    private keyCloakService: KeycloakService,
  ) {}

  async execute(
    createUserRequestRequest: CreateUserRequestRequest,
    admin,
    authorization: string,
  ): Promise<User> {
    const { email, password, tenant_id, username } = createUserRequestRequest;

    const user = new UserEntity({
      email,
      password,
      tenant_id,
      username,
    });

    const save = await this.userRepository.create(user);

    const { resource_access: resourceAccess } = admin;

    const realmManagementRoles = resourceAccess['realm-management'];
    const isMaster =
      realmManagementRoles &&
      realmManagementRoles.roles.some((role) => role === 'manage-users');

    if (isMaster) {
      try {
        await this.keyCloakService.createUser(
          createUserRequestRequest,
          authorization,
        );
      } catch {
        throw new Error('Error to create user in KeyCloak admin');
      }
    }

    return save;
  }
}
