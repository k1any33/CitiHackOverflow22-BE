import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, example: 'Wealth management course' })
  courseTitle: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'This is a financial course from citibank',
  })
  courseDescription: string

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number, example: 1 })
  courseTier: number
}
