import { CourseResponseDto } from '../dto/course.response.dto'

export type CourseResultSuccess = {
  success: true
  data: CourseResponseDto
}

export type CourseResultFailure = {
  success: false
  statusCode: number
  message: string
}
