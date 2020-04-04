import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { UserDto } from './dto/user.dto';

const USER: UserDto = {
  email: 'hellloooo@harta.com',
  name: 'shushu',
  role: 'student',
};

describe('UserService', () => {
  let service: UserService;
  beforeEach(async () => {
    function MockedUserModel(user: UserDto) {
      this.data = user;
      this.save = () => {
        return this.data;
      };
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getModelToken('User'), useValue: MockedUserModel },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the created user', async () => {
    expect(await service.newUser(USER)).toEqual(USER);
  });
});
