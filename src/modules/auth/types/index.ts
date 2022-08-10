export type InternalAuthSuccess = {
  userId: string
}

export type AuthResultSuccess = {
  success: true
  statusCode: number
  accessToken: string
}

export type AuthResultFailure = {
  success: false
  statusCode: number
  message: string
}
