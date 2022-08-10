import { Injectable } from '@nestjs/common'
import { UserRepository } from '../user/user.repository'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './types/jwt-payload.type'

@Injectable()
export class AuthProvider {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}

  hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
  }

  validatePassword(dtoPassword: string, userPassword: string) {
    return bcrypt.compareSync(dtoPassword, userPassword)
  }

  generateJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload)
  }

  async validateUser(payload: JwtPayload) {
    return this.userRepository.findOne(payload.sub)
  }
}
