import {Controller, Post, Body, Get, Param} from '@nestjs/common';
import {CourseService} from './course.new-service';
import {Course} from './entities/course.entity';
import {ApiCreatedResponse, ApiParam} from '@nestjs/swagger';
import {UserCourse} from 'src/user/entities/user_course.entity';

@Controller('course')
export class CourseController
{
  constructor (private readonly courseService: CourseService) {}

  @Post('new')
  async newCourse(@Body() course: Course)
  {
    return await this.courseService.create(course);
  }

  @Get()
  @ApiCreatedResponse({
    description: 'A list of all courses', type: [ Course ],
  })
  async getAllCourses()
  {
    return await this.courseService.getAllCourses();
  }

  @Post('users')
  async addUserToCourse(@Body() userCourse: UserCourse)
  {
    console.log(userCourse);
    return await this.courseService.addUserToCourse(userCourse);
  }

  @ApiParam({name: 'course'})
  @ApiCreatedResponse({
    description: 'An array of users per course',
    type: [ UserCourse ],
  })
  @Get(':course/users')
  async getAllUsersPerCourse(@Param('course') course)
  {
    return await this.courseService.getAllUsersPerCourse(course);
  }
}
