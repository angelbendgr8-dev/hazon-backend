import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/schemas/users.schema';
import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { formatedResponse } from 'src/utils/helpers';

const mockUser = {} as User;
const mockAllOrder = { data: [] };
const mockId = '123';
const mockIdError = 'error';
export const EXCLUDE_FIELDS = '-_id -__v';

export class MockedUserModel {
  constructor(private _: any) {}
  new = jest.fn().mockResolvedValue({});
  static save = jest.fn().mockResolvedValue(mockUser);
  static find = jest.fn().mockReturnThis();
  static create = jest.fn().mockReturnValue(mockUser);
  static findOneAndDelete = jest.fn().mockImplementation((id: string) => {
    if (id == mockIdError) throw new NotFoundException();
    return this;
  });
  static exec = jest.fn().mockReturnValue(mockUser);
  static select = jest.fn().mockReturnThis();
  static findOne = jest.fn().mockImplementation((id: string) => {
    if (id == mockIdError) throw new NotFoundException();
    return this;
  });
}

describe('AuthService', () => {
  let authService: AuthService;
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        ConfigService,
        JwtService,
        {
          provide: getModelToken(User.name),
          useValue: MockedUserModel,
        },
      ],
      controllers: [AuthController],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    authController = module.get<AuthController>(AuthController);
  });

  it('authService should be defined', () => {
    expect(authService).toBeDefined();
  });
  it('authController should be defined', () => {
    expect(authController).toBeDefined();
  });
});
