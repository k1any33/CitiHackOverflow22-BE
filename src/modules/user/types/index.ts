import { UserResponseDto } from '../dto/user.response.dto'

export type UserResultSuccess = {
  success: true
  statusCode: number
  data: UserResponseDto
}

export type UserResultFailure = {
  success: false
  statusCode: number
  message: string
}
