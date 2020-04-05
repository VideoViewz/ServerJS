import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Course} from "./entities/course.entity";
import {Repository, Connection} from "typeorm";
import {courseToUpper} from "src/helper-methods/helpers";
import {UserCourse} from 'src/user/entities/user_course.entity';

@Injectable()
export class CourseService
{
    constructor (@InjectRepository(Course) private courseRepository: Repository<Course>, @InjectRepository(UserCourse) private userCourseRepository: Repository<UserCourse>, private connection: Connection) {}

    async create(course: Course)
    {
        course.name = courseToUpper(course.name);
        return await this.courseRepository.save(course);
    }

    async getAllCourses()
    {
        return await this.courseRepository.find({});
    }

    async addUserToCourse(userCourse: UserCourse) 
    {
        console.log(userCourse);
        return await this.userCourseRepository.save(userCourse);
    }

    async getAllUsersPerCourse(course: string) 
    {
        return await this.connection
            .getRepository(UserCourse)
            .createQueryBuilder('userCourse')
            .where("userCourse.course = :course", {course: course})
            .getMany();
        // return userCourses.map(userCourse => {return {user: userCourse.user, role: userCourse.role};});
    }
}