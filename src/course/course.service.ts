// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Course } from './interfaces/course.interface';
// import { CourseDto } from './dto/course.dto';
// import { MongoError } from 'mongodb';

// @Injectable()
// export class CourseService {
//   constructor(@InjectModel('Course') private courseModel: Model<Course>) {}

//   async addCourse(course: CourseDto): Promise<Course | { error: string }> {
//     const courseUpper = this.courseToUpper(course);
//     const newCourse = new this.courseModel(courseUpper);
//     try {
//       return await newCourse.save();
//     } catch (e) {
//       const error = <MongoError>e;
//       if (error.errmsg.startsWith('E11000 duplicate key error collection:')) {
//         return {
//           error: 'Course already exists',
//         };
//       }
//       return {
//         error: 'An Error ocurred',
//       };
//     }
//   }

//   async getAllCourses(): Promise<Course[]> {
//     return this.courseModel.find({});
//   }

//   courseToUpper(course: CourseDto): CourseDto {
//     const courseUpper: CourseDto = {
//       name: course.name[0].toUpperCase() + course.name.slice(1).toLowerCase(),
//     };
//     return courseUpper;
//   }
// }
