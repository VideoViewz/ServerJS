import {Controller, Post, Body} from '@nestjs/common';
import {UserService} from './user.service';
import {User} from './entities/user.entity';

@Controller('user')
export class UserController
{
    constructor (private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() user: User)
    {
        return await this.userService.createUser(user);
    }
}
