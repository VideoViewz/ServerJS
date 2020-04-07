import {Controller, Post, Body, Get, Param} from '@nestjs/common';
import {UserService} from './user.service';
import {User} from './entities/user.entity';
import {ApiOperation, ApiParam, ApiCreatedResponse} from '@nestjs/swagger';
import {UserCourse} from './entities/user_course.entity';

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

    @ApiParam({name: 'course'})
    @ApiCreatedResponse({
        description: 'Return an array of users per course',
        type: [ UserCourse ],
    })
    @Get(':course')
    async getAllUsersPerCourse(@Param('course') course)
    {
        return await this.userService.getAllUsersPerCourse(course);
    }
}
