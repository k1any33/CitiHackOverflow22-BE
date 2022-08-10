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
