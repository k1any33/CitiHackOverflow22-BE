import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'testuser', required: true })
  readonly username: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: '12345678', required: true })
  readonly password: string
}
