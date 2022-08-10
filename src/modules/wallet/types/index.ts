import { WalletResponseDto } from '../dto/wallet.reponse.dto'

export type WalletResultSuccess = {
  success: true
  data: WalletResponseDto | null
}

export type WalletResultFailure = {
  success: false
  statusCode: number
  message: string
}
