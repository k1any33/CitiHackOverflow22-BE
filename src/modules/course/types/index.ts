import { CourseResponseDto } from '../dto/course.response.dto'

export type CourseResultSuccess = {
  success: true
  data: any
}

export type CourseResultFailure = {
  success: false
  statusCode: number
  message: string
}
