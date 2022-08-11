import { ApiProperty } from '@nestjs/swagger'
import { v4 } from 'uuid'

export class CourseResponseDto {
  @ApiProperty({ type: String, example: v4() })
  courseId: string

  @ApiProperty({ type: String, example: 'Wealth management course' })
  courseTitle: string

  @ApiProperty({
    type: String,
    example: 'This is a financial course from citibank',
  })
  courseDescription: string

  @ApiProperty({ type: Number, example: 1 })
  courseTier: number

  @ApiProperty({ type: Date, example: '2022-08-10T07:39:28.589Z' })
  createdAt?: Date

  @ApiProperty({ type: Date, example: '2022-08-10T07:39:28.589Z' })
  updatedAt?: Date
}
