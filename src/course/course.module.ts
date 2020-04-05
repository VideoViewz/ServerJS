import {Module} from '@nestjs/common';
import {CourseService} from './course.new-service';
import {CourseController} from './course.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Course} from './entities/course.entity';
import {UserCourse} from 'src/user/entities/user_course.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Course, UserCourse ])
  ],
  providers: [ CourseService ],
  controllers: [ CourseController ],
})
export class CourseModule {}
