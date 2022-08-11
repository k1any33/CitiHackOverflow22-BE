import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'

export class CourseFilterDto {
  @IsNumber()
  @ApiPropertyOptional({ required: false, type: Number })
  courseTier?: number
}
