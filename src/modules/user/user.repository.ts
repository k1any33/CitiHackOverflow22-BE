import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from './entities/user.entity'

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(user: User): Promise<User> {
    return this.userModel.create(user)
  }

  findOne(userId: string): Promise<User | null> {
    return this.userModel.findOne({ userId }, { password: 0 }).exec()
  }

  findOneByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec()
  }

  updateOne(userId: string, user: Partial<User>): Promise<User | null> {
    return this.userModel
      .findOneAndUpdate({ userId }, user, { new: true })
      .select(['-password', '-_id'])
      .exec()
  }
}
