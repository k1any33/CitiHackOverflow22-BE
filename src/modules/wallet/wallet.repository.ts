import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UpdateWalletDto } from './dto/update-wallet.dto'
import { Wallet, WalletDocument } from './entities/wallet.entity'

@Injectable()
export class WalletRepository {
  constructor(
    @InjectModel(Wallet.name) private walletModel: Model<WalletDocument>,
  ) {}

  create(walletEntity: Wallet): Promise<Wallet> {
    return this.walletModel.create(walletEntity)
  }

  findOne(walletId: string): Promise<Wallet | null> {
    return this.walletModel.findOne({ walletId }).exec()
  }

  update(
    walletId: string,
    updateWalletDto: UpdateWalletDto,
  ): Promise<Wallet | null> {
    return this.walletModel
      .findOneAndUpdate({ walletId }, updateWalletDto, {
        new: true,
      })
      .exec()
  }

  deleteOne(walletId: string) {
    return this.walletModel.findOneAndDelete({ walletId }).exec()
  }
}
