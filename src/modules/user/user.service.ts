import { Injectable } from '@nestjs/common'
import { UserRepository } from './user.repository'
import { UserResultFailure, UserResultSuccess } from './types'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async updateOne(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResultSuccess | UserResultFailure> {
    const userDocument = await this.userRepository.updateOne(
      userId,
      updateUserDto,
    )
    if (!userDocument) {
      return {
        success: false,
        statusCode: 400,
        message: `User document of id: ${userId} not found`,
      }
    }

    return { success: true, statusCode: 200, data: userDocument }
  }
}
