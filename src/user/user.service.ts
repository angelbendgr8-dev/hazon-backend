import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { ChangePassword } from './dtos/user.dto';
import { formatedResponse } from '../utils/helpers';
import { isEmpty } from 'lodash';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}
  async getUser(userId: string): Promise<any> {
    const userInfo = await this.userModel
      .findOne({ email: userId })
      .select(' -authType -password -createdAt -updatedAt');
    if (isEmpty(userInfo)) throw new NotFoundException('User not found');

    return formatedResponse(
      'User profile fetched successfully',
      200,
      'success',
      userInfo,
    );
  }
  async findById(id: string): Promise<User> {
    return this.userModel
      .findById(id)
      .select(' -authType -password -createdAt -updatedAt');
  }
  
  async changePassword(data: ChangePassword, user: any) {
    const u = await this.userModel.findById(user._id);
    const isMatch = await bcrypt.compare(data.oldPassword, u.password);
    if (!isMatch)
      throw new UnauthorizedException('Old password does not match');

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(data.newPassword, saltOrRounds);

    const updateUser = await this.userModel.findByIdAndUpdate(user._id, {
      password: hash,
    });
    const newUser = await this.getUser(updateUser.email);
    return formatedResponse(
      'Profile updated successfully',
      200,
      'success',
      newUser.data,
    );
  }
}
