import { ApiProperty } from '@nestjs/swagger'
import { v4 } from 'uuid'

export class DeleteWalletReponseDto {
  @ApiProperty({
    type: String,
    example: `Delete wallet of id: ${v4()} is successful`,
  })
  readonly message: string

  @ApiProperty({
    type: Number,
    example: 1,
  })
  readonly deletedCount: number
}
