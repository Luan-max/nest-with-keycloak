import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SecretProviderService } from './secret-provider.service';
import { decode } from 'jsonwebtoken';
@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    private secretProvider: SecretProviderService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: async (_, rawJwtToken, done) => {
        try {
          const decodedToken: any = decode(rawJwtToken);

          const getPublickKey = await this.secretProvider.getSecret(
            decodedToken.email,
          );

          const secret = getPublickKey
            ? `-----BEGIN PUBLIC KEY-----\n${getPublickKey}\n-----END PUBLIC KEY-----`
            : configService.get('JWT_SECRET');

          if (secret) {
            return done(null, secret);
          } else {
            done(new Error('Secret not registered'));
          }
        } catch (err) {
          done(err);
        }
      },
    });
  }

  async validate(payload) {
    return payload;
  }
}
