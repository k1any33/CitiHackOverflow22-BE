import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'

export class CourseFilterDto {
  @IsNumber()
  @ApiProperty({ required: false, type: Number, example: 1 })
  courseTier?: number
}
