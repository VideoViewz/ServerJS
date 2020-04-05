import { Module } from '@nestjs/common';
import { CourseService } from './course.new-service';
import { CourseController } from './course.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSchema } from './schemas/course.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Course', schema: CourseSchema }]),
    TypeOrmModule.forFeature([Course])
  ],
  providers: [CourseService],
  controllers: [CourseController],
})
export class CourseModule { }
