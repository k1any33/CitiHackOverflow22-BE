import {
  Controller,
  Body,
  Patch,
  Req,
  InternalServerErrorException,
  HttpException,
  Inject,
  Logger,
  LoggerService,
  HttpStatus,
  Get,
} from '@nestjs/common'
import { UserService } from './user.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { RequestWithUser } from '../auth/types/request-with-user'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UserResponseDto } from './dto/user.response.dto'

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: UserResponseDto })
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'User is not found'})
  @ApiBearerAuth()
  async getOne(
    @Req() req: RequestWithUser,
  ): Promise<UserResponseDto | HttpException> {
    const result = await this.userService
      .getOne(req.user.userId)
      .catch(({ message }) => {
        this.logger.error(
          `Error in fetching user with userId: ${req.user.userId}`,
          {
            method: 'get',
            errorMessage: message,
          },
        )
        throw new InternalServerErrorException(
          `Failed to fetching user of this userId "${req.user.userId}"`,
        )
      })
    if (!result.success) {
      throw new HttpException(result.message, result.statusCode)
    }
    return result.data
  }

  @Patch()
  @ApiResponse({ status: HttpStatus.OK, type: UserResponseDto })
  @ApiBearerAuth()
  async updateOne(
    @Req() req: RequestWithUser,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto | HttpException> {
    const result = await this.userService
      .updateOne(req.user.userId, updateUserDto)
      .catch(({ message }) => {
        this.logger.error(
          `Error in updating user with userId: ${req.user.userId}`,
          {
            method: 'patch',
            errorMessage: message,
          },
        )
        throw new InternalServerErrorException(
          `Failed to update user of this userId "${req.user.userId}"`,
        )
      })
    if (!result.success) {
      throw new HttpException(result.message, result.statusCode)
    }
    return result.data
  }
}
