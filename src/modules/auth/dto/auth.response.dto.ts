import { ApiProperty } from '@nestjs/swagger'

export class AuthResponseDto {
  @ApiProperty({ type: Boolean, example: true })
  readonly success: boolean

  @ApiProperty({ type: String, example: 'jwt token' })
  readonly accessToken: string
}
