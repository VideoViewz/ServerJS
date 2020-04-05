import {Module} from '@nestjs/common';
import {CourseService} from './course.new-service';
import {CourseController} from './course.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Course} from './entities/course.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Course ])
  ],
  providers: [ CourseService ],
  controllers: [ CourseController ],
})
export class CourseModule {}
