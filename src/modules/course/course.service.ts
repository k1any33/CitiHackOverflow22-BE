import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { CourseRepository } from './course.repository';
import { CourseFilterDto } from './dto/course-filter.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { CourseResultFailure, CourseResultSuccess } from './types';

@Injectable()
export class CourseService {
  constructor(private readonly courseRepository: CourseRepository) {}

  async create(
    createCourseDto: CreateCourseDto,
  ): Promise<CourseResultSuccess> {
    const courseEntity: Course = { ...createCourseDto, courseId: v4() }
    const courseDocument = await this.courseRepository.create(courseEntity)

    return { success: true, data: courseDocument }
  }

  async findAll(
    fitlers: CourseFilterDto
  ): Promise<CourseResultSuccess> {
    const courseDocumentArray = await this.courseRepository.findAll(fitlers)

    return { success: true, data: courseDocumentArray }
  }

  async updateOne(
    courseId: string,
    updateCourseDto: UpdateCourseDto,
  ): Promise<CourseResultSuccess | CourseResultFailure> {
    const courseDocument = await this.courseRepository.updateOne(
      courseId,
      updateCourseDto,
    )
    return {
      success: true,
      data: courseDocument,
    }
  }

  async deleteOne(
    courseId: string,
  ): Promise<CourseResultSuccess | CourseResultFailure> {
    const courseDocument = await this.courseRepository.findOne(courseId)

    if (!courseDocument) {return {
      success: false,
      statusCode: 400,
      message: `Course of this id: ${courseId} is not found`,
    }}

    await this.courseRepository.deleteOne(courseId)

    return {
      success: true,
      data: null,
    }
  }
}
