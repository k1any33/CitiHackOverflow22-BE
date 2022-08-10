import { Request } from 'express'
import { InternalAuthSuccess } from '.'

export interface RequestWithUser extends Request {
  user: InternalAuthSuccess
}
