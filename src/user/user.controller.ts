import {Controller, Post, Body} from '@nestjs/common';
import {UserService} from './user.service';
import {User} from './entities/user.entity';
import {ApiOperation} from '@nestjs/swagger';

@Controller('user')
export class UserController
{
    constructor (private readonly userService: UserService) {}

    @ApiOperation({description: "Create a new user"})
    @Post()
    async createUser(@Body() user: User)
    {
        return await this.userService.createUser(user);
    }
}
