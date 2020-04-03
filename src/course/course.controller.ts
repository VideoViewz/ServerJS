import { Controller, Post, Body, Get } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseDto } from './dto/course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('new')
  async newCourse(@Body() course: CourseDto) {
    return await this.courseService.addCourse(course);
  }

  @Get()
  async getAllCourses() {
    return await this.courseService.getAllCourses();
  }
}
