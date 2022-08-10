import { Injectable } from '@nestjs/common'
import { v4 } from 'uuid'
import { UserService } from '../user/user.service'
import { CreateWalletDto } from './dto/create-wallet.dto'
import { UpdateWalletDto } from './dto/update-wallet.dto'
import { Wallet } from './entities/wallet.entity'
import { WalletResultFailure, WalletResultSuccess } from './types'
import { WalletRepository } from './wallet.repository'

@Injectable()
export class WalletService {
  constructor(private readonly walletRepository: WalletRepository) {}

  async create(
    userId: string,
    createWalletDto: CreateWalletDto,
  ): Promise<WalletResultSuccess> {
    const walletEntity: Wallet = { ...createWalletDto, userId, walletId: v4() }
    const walletDocument = await this.walletRepository.create(walletEntity)

    return { success: true, data: walletDocument }
  }

  async findOne(
    userId: string,
    walletId: string,
  ): Promise<WalletResultSuccess | WalletResultFailure> {
    const walletDocument = await this.walletRepository.findOne(walletId)

    if (!walletDocument) return this.walletNotFoundResponse(walletId)

    if (walletDocument.userId !== userId) return this.unauthorizedAccess()

    return { success: true, data: walletDocument }
  }

  async update(
    userId: string,
    walletId: string,
    updateWalletDto: UpdateWalletDto,
  ): Promise<WalletResultSuccess | WalletResultFailure> {
    const walletDocument = await this.walletRepository.findOne(walletId)

    if (!walletDocument) return this.walletNotFoundResponse(walletId)

    if (walletDocument.userId !== userId) return this.unauthorizedAccess()

    const newWalletDocument = await this.walletRepository.update(
      walletId,
      updateWalletDto,
    )
    return {
      success: true,
      data: newWalletDocument,
    }
  }

  async deleteOne(
    userId: string,
    walletId: string,
  ): Promise<WalletResultSuccess | WalletResultFailure> {
    const walletDocument = await this.walletRepository.findOne(walletId)

    if (!walletDocument) return this.walletNotFoundResponse(walletId)

    if (walletDocument.userId !== userId) return this.unauthorizedAccess()

    await this.walletRepository.deleteOne(walletId)

    return {
      success: true,
      data: null,
    }
  }

  private walletNotFoundResponse(walletId: string): WalletResultFailure {
    return {
      success: false,
      statusCode: 400,
      message: `Wallet of this id: ${walletId} is not found`,
    }
  }

  private unauthorizedAccess(): WalletResultFailure {
    return {
      success: false,
      statusCode: 403,
      message: 'You are not allowed to view this resource',
    }
  }
}
