import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserModule } from '../user/user.module'
import { AuthProvider } from './auth.provider'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { JwtStrategy } from './passport/jwt.strategy'
import { JwtAuthGuard } from './guard/auth.guard'
import { APP_GUARD } from '@nestjs/core'

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('secretKey'),
        signOptions: { expiresIn: config.get('jwtExpiry') },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthProvider,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
