import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import passport from 'passport';
import { MockedUserModel } from './auth.service.spec';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../user/schemas/users.schema';
import { JwtModule } from '@nestjs/jwt';
import { RequestWithUser } from 'src/user/interfaces/user.interface';
import { createMock } from '@golevelup/ts-jest';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { response } from 'express';
import { Model } from 'mongoose';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, PassportModule, JwtModule],
      controllers: [AuthController],
      providers: [
        AuthService,
        ConfigService,
        {
          provide: getModelToken(User.name),
          useValue: MockedUserModel,
        },
      ],
    }).compile();

    configService = module.get<ConfigService>(ConfigService);
    authService = module.get<AuthService>(AuthService);
    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });
  it('should call the login method successfully', async () => {
    const data = { username: '', password: '' };
    const request = createMock<RequestWithUser>();
    const result = {};
    jest.spyOn(authService, 'login').mockImplementation(async () => result);

    expect(await authController.login(data, request)).toBe(result);
  });
  it('should call the register method successfully', async () => {
    const data = { email: '', password: '', firstName: '', lastName: '' };
    const result = {};
    jest.spyOn(authService, 'register').mockImplementation(async () => result);

    expect(await authController.register(data)).toBe(result);
  });
});
describe('authentication e2e test', () => {
  let app: INestApplication;
  let authController: AuthController;
  let authService: AuthService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, PassportModule, JwtModule],
      controllers: [AuthController],
      providers: [
        AuthService,
        ConfigService,
        LocalAuthGuard,
        {
          provide: getModelToken(User.name),
          useValue: MockedUserModel,
        },
        {
          provide: 'local',
          useExisting: LocalAuthGuard,
          // ^^^^^^^^ notice the use of 'useExisting' instead of 'useClass'
        },
      ],
    })
     
      .compile();

    app = module.createNestApplication();
    await app.init();
    configService = module.get<ConfigService>(ConfigService);
    authService = module.get<AuthService>(AuthService);
    authController = module.get<AuthController>(AuthController);
  });
 
  it(`/Post register to return user already exists and 404 error`, () => {
    const data ={
      email: 'anglebendgr8@gmail.com',
      password: 'angelben',
      firstName: 'test',
      lastName: 'test',
    }
    return request(app.getHttpServer())
      .post('/auth/register')
      .send(data)
      .expect(404).then((response: any) =>{
        expect(response.body.message).toEqual('User with one of the provided credentials already exists');
      });
  });
  it(`/Post register is done successfully`, () => {
    const data ={
      email: 'newuser@gmail.com',
      password: 'angelben',
      firstName: 'test',
      lastName: 'test',
    }
    return request(app.getHttpServer())
      .post('/auth/register')
      .send(data)
      .expect(404).then((response: any) =>{
        expect(response.body.message).toEqual('User with one of the provided credentials already exists');
      });
  });
  
});
