import {
  HttpException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthProvider } from '../auth.provider'
import { InternalAuthSuccess } from '../types'
import { JwtPayload } from '../types/jwt-payload.type'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(ConfigService) config: ConfigService,
    private authProvider: AuthProvider,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('secretKey'),
    })
  }

  async validate(
    payload: JwtPayload,
  ): Promise<InternalAuthSuccess | HttpException> {
    const user = await this.authProvider.validateUser(payload)

    if (!user) throw new UnauthorizedException()

    return { userId: payload.sub }
  }
}
