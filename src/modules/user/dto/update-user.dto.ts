import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString } from 'class-validator'
import { v4 } from 'uuid'

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, example: 'John@gmail.com' })
  readonly email?: string

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, example: v4()})
  readonly currentCourseId?: string

  @IsOptional()
  @IsNumber()
  @ApiProperty({ type: Number, example: 1 })
  readonly currentProgress?: number
}
