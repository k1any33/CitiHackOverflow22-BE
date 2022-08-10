import { Module } from '@nestjs/common'
import { WalletService } from './wallet.service'
import { WalletController } from './wallet.controller'
import { WalletRepository } from './wallet.repository'
import { MongooseModule } from '@nestjs/mongoose'
import { Wallet, WalletSchema } from './entities/wallet.entity'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Wallet.name, schema: WalletSchema }]),
  ],
  controllers: [WalletController],
  providers: [WalletService, WalletRepository],
})
export class WalletModule {}
