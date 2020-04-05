import {Test, TestingModule} from '@nestjs/testing';
import {UserService} from './user.service';
import {getRepositoryToken} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {Repository} from 'typeorm';

describe('UserService', () =>
{
    let service: UserService;
    let userRepo: Repository<User>;

    beforeEach(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ UserService,
                {provide: getRepositoryToken(User), useClass: Repository},
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        userRepo = module.get<Repository<User>>(getRepositoryToken(User));
    });

    it('should be defined', () =>
    {
        expect(service).toBeDefined();
    });

    it('should return a new user', async () =>
    {
        const user: User = {
            email: "jj@jhony.com",
            name: "Shucki",
        };
        jest.spyOn(userRepo, 'save').mockResolvedValueOnce(user);
        expect(await service.addUser(user)).toBe(user);
    });
});
