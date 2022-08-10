import { ApiProperty } from '@nestjs/swagger'
import { v4 } from 'uuid'

export class WalletResponseDto {
  @ApiProperty({ type: String, example: v4() })
  walletId: string

  @ApiProperty({ type: String, example: v4() })
  userId: string

  @ApiProperty({ type: String, example: 'My wallet' })
  walletName: string

  @ApiProperty({ type: String, example: 'This is my first wallet' })
  walletDescription: string

  @ApiProperty({ type: String, example: 'https://logo.com' })
  walletLogo?: string

  @ApiProperty({ type: Date, example: '2022-08-10T07:39:28.589Z' })
  createdAt?: Date

  @ApiProperty({ type: Date, example: '2022-08-10T07:39:28.589Z' })
  updatedAt?: Date
}
