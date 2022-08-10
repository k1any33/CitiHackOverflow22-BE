import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  InternalServerErrorException,
  Logger,
  LoggerService,
  Post,
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { Public } from 'src/utils/public.decorator'
import { AuthService } from './auth.service'
import { AuthResponseDto } from './dto/auth.response.dto'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  @Public()
  @Post('register')
  @ApiResponse({ status: HttpStatus.OK, type: AuthResponseDto })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'The username "John" has already been taken',
  })
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<AuthResponseDto | HttpException> {
    const result = await this.authService
      .register(registerDto)
      .catch(({ message }) => {
        this.logger.error('Error in register user', {
          method: 'post',
          errorMessage: message,
        })
        throw new InternalServerErrorException(
          `Failed to register user with this username: ${registerDto.username}`,
        )
      })
    if (!result.success) {
      throw new HttpException(result.message, result.statusCode)
    }
    return { success: true, accessToken: result.accessToken }
  }

  @Public()
  @Post('login')
  @ApiResponse({ status: HttpStatus.OK, type: AuthResponseDto })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'The user does not exist',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password is incorrect',
  })
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<AuthResponseDto | HttpException> {
    const result = await this.authService
      .login(loginDto)
      .catch(({ message }) => {
        this.logger.error('Error in login user', {
          method: 'post',
          errorMessage: message,
        })
        throw new InternalServerErrorException(
          `Failed to login user with this username: ${loginDto.username}`,
        )
      })
    if (!result.success) {
      throw new HttpException(result.message, result.statusCode)
    }
    return { success: true, accessToken: result.accessToken }
  }
}
