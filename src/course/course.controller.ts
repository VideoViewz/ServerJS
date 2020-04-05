import {Controller, Post, Body, Get} from '@nestjs/common';
import {CourseService} from './course.new-service';
import {Course} from './entities/course.entity';

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
  async getAllCourses()
  {
    return await this.courseService.getAllCourses();
  }
}
