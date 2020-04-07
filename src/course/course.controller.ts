import {Controller, Post, Body, Get, Param} from '@nestjs/common';
import {CourseService} from './course.new-service';
import {Course} from './entities/course.entity';
import {ApiCreatedResponse, ApiParam, ApiBody, ApiOperation} from '@nestjs/swagger';
import {UserCourse} from 'src/user/entities/user_course.entity';

@Controller('course')
export class CourseController
{
  constructor (private readonly courseService: CourseService) {}

  @ApiOperation({description: "Create a new course"})
  @ApiBody({description: "Create a new course", type: Course})
  @Post()
  async newCourse(@Body() course: Course)
  {
    return await this.courseService.create(course);
  }

  @Get()
  @ApiCreatedResponse({
    description: 'Return a list of all courses', type: [ Course ],
  })
  async getAllCourses()
  {
    return await this.courseService.getAllCourses();
  }

  @ApiOperation({description: "Add a user to a course"})
  @ApiBody({description: "Note: user is an email, course is a course name", type: UserCourse})
  @Post('users')
  async addUserToCourse(@Body() userCourse: UserCourse)
  {
    console.log(userCourse);
    return await this.courseService.addUserToCourse(userCourse);
  }

  @ApiParam({name: 'user', description: 'user email'})
  @ApiCreatedResponse({
    description: 'Return an array of course names per user',
    type: [ Course ],
  })
  @Get(':user')
  async getCoursesPerUser(@Param('user') user: string)
  {
    return await this.courseService.getCoursesPerUser(user);
  }
}
