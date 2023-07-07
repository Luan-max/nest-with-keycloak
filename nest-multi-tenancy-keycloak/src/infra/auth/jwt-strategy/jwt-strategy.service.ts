import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { SecretProviderService } from './secret-provider.service';
import { decode, verify } from 'jsonwebtoken';
@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    private secretProvider: SecretProviderService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // secretOrKey: configService.get('JWT_SECRET'),
      secretOrKeyProvider: async (_, rawJwtToken, done) => {
        try {
          const decodedToken: any = decode(rawJwtToken);
          console.log(decodedToken);
          const secret = await this.secretProvider.getSecret(
            decodedToken.email,
          );

          if (secret) {
            console.log('oi chegou')
            return done(null, secret);
          } else {
            done(new Error('Secret not found'));
          }
        } catch (err) {
          console.log(err);
          done(err);
        }
      },
    });
  }

  async validate(payload) {
    return payload;
  }
}
