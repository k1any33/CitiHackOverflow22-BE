import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type CourseDocument = Course & Document

@Schema({
  collection: 'courses',
  versionKey: false,
  _id: true,
  timestamps: true,
})
export class Course {
  @Prop({ unique: true, required: true, type: String })
  courseId: string

  @Prop({ required: true, type: String })
  courseTitle: string

  @Prop({ required: true, type: String })
  courseDescription: string

  @Prop({ required: true, type: Number })
  courseTier: number
}

export const CourseSchema = SchemaFactory.createForClass(Course)
