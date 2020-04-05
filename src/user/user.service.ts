import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {Repository} from 'typeorm';

@Injectable()
export class UserService
{
    constructor (@InjectRepository(User) private userRepository: Repository<User>) {}

    async addUser(user: User)
    {
        return await this.userRepository.save(user);
    }

}