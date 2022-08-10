import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateWalletDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, type: String, example: 'TestWalletName' })
  walletName: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, type: String, example: 'A short description' })
  walletDescription: string

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, type: String, example: 'https://logo.com' })
  walletLogo?: string
}
