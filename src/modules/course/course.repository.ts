import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CourseFilterDto } from './dto/course-filter.dto'
import { UpdateCourseDto } from './dto/update-course.dto'
import { Course, CourseDocument } from './entities/course.entity'

@Injectable()
export class CourseRepository {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  create(courseEntity: Course): Promise<Course> {
    return this.courseModel.create(courseEntity)
  }

  findOne(courseId: string): Promise<Course | null> {
    return this.courseModel.findOne({ courseId }).exec()
  }

  findAll(): Promise<Course[]> {
    return this.courseModel.find().exec()
  }

  updateOne(
    courseId: string,
    updateCourseDto: UpdateCourseDto,
  ): Promise<Course | null> {
    return this.courseModel
      .findOneAndUpdate({ courseId }, updateCourseDto, {
        new: true,
      })
      .exec()
  }

  deleteOne(courseId: string) {
    return this.courseModel.findOneAndDelete({ courseId }).exec()
  }
}
