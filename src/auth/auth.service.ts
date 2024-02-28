import {
  ConflictException,
  Injectable, NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/schemas/users.schema';
import { Model } from 'mongoose';
import { isEmpty } from 'lodash';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async login(user: any): Promise<any> {
    const userData = await this.userModel.findOne(
     {email: user.email},
    );

    const token = this.jwtService.sign({
      id: user._id,
    });
    const response = {
      user: userData,
      access_token: token,
    };
    return {
      message: 'Login successful',
      data: response,
    };
  }

  async validateUser(email: string): Promise<any> {
    const user = await this.userModel.findOne({
      email: email.trim().toLocaleLowerCase(),
    });
    if (isEmpty(user)) throw new NotFoundException(`User does not exist`);

    return user;
  }

  async validateUserCredentials(email: string): Promise<any> {
    const user = await this.userModel.findOne({
      email: email.trim().toLocaleLowerCase(),
    });
    if (!isEmpty(user))
      throw new ConflictException(`User with ${email} already exists`);

    return { data: true, message: 'user details is available' };
  }
  async validateEmailAndUserName(data: any): Promise<any> {
    const user = await this.userModel.findOne({
      email: data.email.trim().toLocaleLowerCase(),
    });
    if (!isEmpty(user))
      throw new NotFoundException(
        `User with one of the provided credentials already exists`,
      );

    return user;
  }

  async validateUserWithPassword(
    email: string,
    password: string,
  ): Promise<any> {
    console.log(email);
    const user = await this.userModel.findOne({
      email: email,
    });
    if (isEmpty(user)) throw new NotFoundException(`User does not exist`);

    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        throw new UnauthorizedException('Invalid authentication credentials');
      
    } catch (error) {
      
    }

    return user;
  }
  async register(data: RegisterUserDto): Promise<any> {
    const user = await this.validateEmailAndUserName(data);
    if (!isEmpty(user)) {
      throw new NotFoundException(
        `User ${data.email} already exist, please try again with a different credentials`,
      );
    } else {
      const hashedPassword = await this.encryptPassword(data.password);
      
      const newUser = await this.userModel.create({
        ...data,
        email: data.email.toLocaleLowerCase(),
        password: hashedPassword,
      });
      const token = this.jwtService.sign({
        id: newUser._id,
      });
      const response = {
        user: newUser,
        access_token: token,
      };
      return {
        message: 'Registration successful',
        data: response,
      };
    }
  }
  async encryptPassword(password): Promise<string> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);

    return hash;
  }
}
