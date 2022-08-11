import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common'
import { UserRepository } from '../user/user.repository'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { AuthProvider } from './auth.provider'
import { v4 } from 'uuid'
import { JwtPayload } from './types/jwt-payload.type'
import { AuthResultFailure, AuthResultSuccess } from './types'
@Injectable()
export class AuthService {
  constructor(
    @Inject(Logger) private readonly logger: LoggerService,
    private userRepository: UserRepository,
    private authProvider: AuthProvider,
  ) {}

  async register(
    registerDto: RegisterDto,
  ): Promise<AuthResultSuccess | AuthResultFailure> {
    const userDocument = await this.userRepository.findOneByUsername(
      registerDto.username,
    )
    if (userDocument) {
      return {
        success: false,
        statusCode: 400,
        message: `The username ${registerDto.username} has already been taken`,
      }
    }
    const hashedPassword = this.authProvider.hashPassword(registerDto.password)
    const user = await this.userRepository.create({
      username: registerDto.username,
      password: hashedPassword,
      userId: v4(),
    })

    const jwtPayload: JwtPayload = { sub: user.userId }
    const jwt = this.authProvider.generateJwtToken(jwtPayload)

    this.logger.log(
      `success: register user with username: ${registerDto.username}`,
      {
        method: 'post',
        username: registerDto.username,
      },
    )

    return {
      success: true,
      statusCode: 201,
      accessToken: jwt,
    }
  }

  async login(
    loginDto: LoginDto,
  ): Promise<AuthResultSuccess | AuthResultFailure> {
    const user = await this.userRepository.findOneByUsername(loginDto.username)
    if (!user) {
      return {
        success: false,
        statusCode: 401,
        message: `The username ${loginDto.username} does not exist`,
      }
    }

    const validPassword = this.authProvider.validatePassword(
      loginDto.password,
      user.password,
    )
    if (!validPassword) {
      return {
        success: false,
        statusCode: 401,
        message: 'Password is incorrect',
      }
    }
    const jwtPayload: JwtPayload = { sub: user.userId }
    const jwt = this.authProvider.generateJwtToken(jwtPayload)

    this.logger.log(`success: login user with username: ${loginDto.username}`, {
      method: 'post',
      username: loginDto.username,
    })

    return {
      success: true,
      statusCode: 201,
      accessToken: jwt,
    }
  }
}
