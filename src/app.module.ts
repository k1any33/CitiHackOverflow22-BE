import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
import configuration from './config/configuration'
import { LoggingModule } from './logger.module'
import { WalletModule } from './modules/wallet/wallet.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('mongouri'),
      }),
    }),
    UserModule,
    AuthModule,
    LoggingModule,
    WalletModule,
  ],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
