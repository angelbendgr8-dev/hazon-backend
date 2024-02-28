import { Test, TestingModule } from '@nestjs/testing';
import { SocketService } from './socket.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../user/schemas/users.schema';
import { MockedUserModel } from '../auth/auth.service.spec';

describe('SocketService', () => {
  let service: SocketService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({

      providers: [
        SocketService,
        JwtService,
        {
          provide: getModelToken(User.name),
          useValue: MockedUserModel,
        },
      ],
    }).compile();

    service = module.get<SocketService>(SocketService);
    // userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
