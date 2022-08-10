import { ApiProperty } from '@nestjs/swagger'
import { v4 } from 'uuid'

export class UserResponseDto {
  @ApiProperty({ type: String, example: v4() })
  readonly userId: string

  @ApiProperty({ type: String, example: 'John27' })
  readonly username: string

  @ApiProperty({ type: String, example: 'John' })
  readonly name?: string

  @ApiProperty({ type: Date, example: '2022-08-10T07:39:28.589Z' })
  readonly createdAt?: Date

  @ApiProperty({ type: Date, example: '2022-08-10T07:39:28.589Z' })
  readonly updatedAt?: Date
}
