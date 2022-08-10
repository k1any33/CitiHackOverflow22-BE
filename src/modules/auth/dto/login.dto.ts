import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Min } from 'class-validator'

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'testuser', required: true })
  readonly username: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: '12345678', required: true })
  readonly password: string
}
