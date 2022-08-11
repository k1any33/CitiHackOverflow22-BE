import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type UserDocument = User & Document

@Schema({ collection: 'users', versionKey: false, _id: true, timestamps: true })
export class User {
  @Prop({ unique: true, required: true, type: String })
  userId: string

  @Prop({ unique: true, required: true, type: String })
  username: string

  @Prop({ required: true, type: String })
  password: string

  @Prop({ required: false, type: String })
  email?: string

  @Prop({ required: false, type: String })
  currentCourseId?: string

  @Prop({ required: false, type: Number })
  currentProgress?: number
}

export const UserSchema = SchemaFactory.createForClass(User)
