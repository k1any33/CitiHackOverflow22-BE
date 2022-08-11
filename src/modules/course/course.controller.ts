import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Req, HttpException, Logger, Inject, LoggerService, InternalServerErrorException } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestWithUser } from '../auth/types/request-with-user';
import { CourseService } from './course.service';
import { CourseResponseDto } from './dto/course.response.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@ApiTags('Course')
@Controller('course')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  @Post()
  @ApiResponse({ status: HttpStatus.OK, type: CourseResponseDto })
  @ApiBearerAuth()
  async create(
    @Req() req: RequestWithUser,
    @Body() createCourseDto: CreateCourseDto,
  ): Promise<CourseResponseDto | HttpException> {
    const result = await this.courseService
      .create(req.user.userId, createCourseDto)
      .catch(({ message }) => {
        this.logger.error(`Error in creating course`, {
          method: 'post',
          errorMessage: message,
        })
        throw new InternalServerErrorException('Error in creating course')
      })
    return result.data!
  }

  @Get(':walletId')
  @ApiResponse({ status: HttpStatus.OK, type: WalletResponseDto })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'You are not allowed to view this resource',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'This wallet does not exist',
  })
  @ApiBearerAuth()
  async findOne(
    @Req() req: RequestWithUser,
    @Param('walletId') walletId: string,
  ): Promise<WalletResponseDto | HttpException> {
    const result = await this.walletService
      .findOne(req.user.userId, walletId)
      .catch(({ message }) => {
        this.logger.error(`Error in finding wallet of this id: ${walletId}`, {
          method: 'get',
          errorMessage: message,
        })
        throw new InternalServerErrorException('Error in finding wallet')
      })
    if (!result.success) {
      throw new HttpException(result.message, result.statusCode)
    }
    return result.data!
  }

  @Patch(':walletId')
  @ApiResponse({ status: HttpStatus.OK, type: WalletResponseDto })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'You are not allowed to view this resource',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'This wallet does not exist',
  })
  @ApiBearerAuth()
  async update(
    @Req() req: RequestWithUser,
    @Param('walletId') walletId: string,
    @Body() updateWalletDto: UpdateWalletDto,
  ): Promise<WalletResponseDto | HttpException> {
    const result = await this.walletService
      .update(req.user.userId, walletId, updateWalletDto)
      .catch(({ message }) => {
        this.logger.error(`Error in updating wallet of this id: ${walletId}`, {
          method: 'patch',
          errorMessage: message,
        })
        throw new InternalServerErrorException('Error in updating wallet')
      })
    if (!result.success) {
      throw new HttpException(result.message, result.statusCode)
    }
    return result.data!
  }

  @Delete(':walletId')
  @ApiResponse({ status: HttpStatus.OK, type: DeleteWalletReponseDto })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'You are not allowed to view this resource',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'This wallet does not exist',
  })
  @ApiBearerAuth()
  async deleteOne(
    @Req() req: RequestWithUser,
    @Param('walletId') walletId: string,
  ): Promise<DeleteWalletReponseDto | HttpException> {
    const result = await this.walletService
      .deleteOne(req.user.userId, walletId)
      .catch(({ message }) => {
        this.logger.error(`Error in deleting wallet of this id: ${walletId}`, {
          method: 'delete',
          errorMessage: message,
        })
        throw new InternalServerErrorException('Error in deleting wallet')
      })
    if (!result.success) {
      throw new HttpException(result.message, result.statusCode)
    }
    return {
      message: `Delete wallet of id: ${walletId} is successful`,
      deletedCount: 1,
    }
  }
}
