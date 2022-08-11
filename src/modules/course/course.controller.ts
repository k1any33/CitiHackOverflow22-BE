import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Req,
  HttpException,
  Logger,
  Inject,
  LoggerService,
  InternalServerErrorException,
  Query,
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { Public } from 'src/utils/public.decorator'
import { CourseService } from './course.service'
import { CourseFilterDto } from './dto/course-filter.dto'
import { CourseResponseDto } from './dto/course.response.dto'
import { CreateCourseDto } from './dto/create-course.dto'
import { UpdateCourseDto } from './dto/update-course.dto'

@ApiTags('Course')
@Controller('course')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  @Public()
  @Post()
  @ApiResponse({ status: HttpStatus.OK, type: CourseResponseDto })
  async create(
    @Body() createCourseDto: CreateCourseDto,
  ): Promise<CourseResponseDto | HttpException> {
    const result = await this.courseService
      .create(createCourseDto)
      .catch(({ message }) => {
        this.logger.error(`Error in creating course`, {
          method: 'post',
          errorMessage: message,
        })
        throw new InternalServerErrorException('Error in creating course')
      })
    return result.data
  }

  @Public()
  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: [CourseResponseDto] })
  async findAll(): Promise<CourseResponseDto | HttpException> {
    const result = await this.courseService.findAll().catch(({ message }) => {
      this.logger.error(`Error in getting course`, {
        method: 'get',
        errorMessage: message,
      })
      throw new InternalServerErrorException('Error in fetching courses')
    })
    return result.data
  }

  @Public()
  @Patch(':courseId')
  @ApiResponse({ status: HttpStatus.OK, type: CourseResponseDto })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'This course does not exist',
  })
  async update(
    @Param('courseId') courseId: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<CourseResponseDto | HttpException> {
    const result = await this.courseService
      .updateOne(courseId, updateCourseDto)
      .catch(({ message }) => {
        this.logger.error(`Error in updating course of this id: ${courseId}`, {
          method: 'patch',
          errorMessage: message,
        })
        throw new InternalServerErrorException('Error in updating course')
      })
    if (!result.success) {
      throw new HttpException(result.message, result.statusCode)
    }
    return result.data
  }
}
