import { ApiProperty } from "@nestjs/swagger"

export class CreateCourseDto {
  @ApiProperty({ type: String, example: 'Wealth management course' })
  courseTitle: string

  @ApiProperty({
    type: String,
    example: 'This is a financial course from citibank',
  })
  courseDescription: string

  @ApiProperty({ type: Number, example: 1 })
  courseTier: number
}
