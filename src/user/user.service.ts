import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private courseModel: Model<User>) {}

  async newUser(user: UserDto) {
    const newUser = new this.courseModel(user);
    return await newUser.save();
  }

  async updateUserCourses(userEmail: string) {}
}
