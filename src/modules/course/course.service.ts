import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { CourseRepository } from './course.repository';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { CourseResultSuccess } from './types';

@Injectable()
export class CourseService {
  constructor(private readonly courseRepository: CourseRepository) {}

  async create(
    userId: string,
    createCourseDto: CreateCourseDto,
  ): Promise<CourseResultSuccess> {
    const courseEntity: Course = { ...createCourseDto, courseId: v4() }
    const courseDocument = await this.courseRepository.create(courseEntity)

    return { success: true, data: courseDocument }
  }

  async findOne(
    courseId: string
  ): Promise<CourseResultSuccess | CourseResultFailure> {
    const courseDocument = await this.courseRepository.findOne(courseId)

    if (!courseDocument) return this.walletNotFoundResponse(courseId)


    return { success: true, data: courseDocument }
  }

  async update(
    userId: string,
    walletId: string,
    updateWalletDto: UpdateWalletDto,
  ): Promise<CourseResultSuccess | CourseResultFailure> {
    const courseDocument = await this.courseRepository.findOne(walletId)

    if (!courseDocument) return this.walletNotFoundResponse(walletId)

    if (courseDocument.userId !== userId) return this.unauthorizedAccess()

    const newcourseDocument = await this.courseRepository.update(
      walletId,
      updateWalletDto,
    )
    return {
      success: true,
      data: newcourseDocument,
    }
  }

  async deleteOne(
    userId: string,
    walletId: string,
  ): Promise<CourseResultSuccess | CourseResultFailure> {
    const courseDocument = await this.courseRepository.findOne(walletId)

    if (!courseDocument) return this.walletNotFoundResponse(walletId)

    if (courseDocument.userId !== userId) return this.unauthorizedAccess()

    await this.courseRepository.deleteOne(walletId)

    return {
      success: true,
      data: null,
    }
  }

  private walletNotFoundResponse(walletId: string): CourseResultFailure {
    return {
      success: false,
      statusCode: 400,
      message: `Wallet of this id: ${walletId} is not found`,
    }
  }

  private unauthorizedAccess(): CourseResultFailure {
    return {
      success: false,
      statusCode: 403,
      message: 'You are not allowed to view this resource',
    }
  }
}
