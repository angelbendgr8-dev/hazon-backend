import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

import { formatedResponse } from '../utils/helpers';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';
import { MockedUserModel } from '../auth/auth.service.spec';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: MockedUserModel,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
