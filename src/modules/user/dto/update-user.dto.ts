import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, example: 'John@gmail.com' })
  readonly email?: string

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, example: 'Wealth Management Course' })
  readonly currentCourse?: string

  @IsOptional()
  @IsNumber()
  @ApiProperty({ type: Number, example: 1 })
  readonly currentProgress?: number
}
