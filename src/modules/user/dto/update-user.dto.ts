import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, example: 'John' })
  readonly name?: string
}
