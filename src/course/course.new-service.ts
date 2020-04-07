import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Course} from "./entities/course.entity";
import {Repository, Connection} from "typeorm";
import {courseToUpper} from "../helper-methods/helpers";
import {UserCourse} from '../user/entities/user_course.entity';

@Injectable()
export class CourseService
{
    constructor (@InjectRepository(Course) private courseRepository: Repository<Course>, @InjectRepository(UserCourse) private userCourseRepository: Repository<UserCourse>, private connection: Connection) {}

    /**
     * Create a new course in the database
     * @param course a course to create
     */
    async create(course: Course): Promise<Course>
    {
        course.name = courseToUpper(course.name);
        return await this.courseRepository.save(course);
    }

    /**
     * Return a list of all courses
     */
    async getAllCourses(): Promise<Course[]>
    {
        return await this.courseRepository.find({});
    }

    /**
     * Add a user to a course
     * @param userCourse
     */
    async addUserToCourse(userCourse: UserCourse): Promise<UserCourse>
    {
        console.log(userCourse);
        return await this.userCourseRepository.save(userCourse);
    }

    /**
     * Return a list of users per course
     * @param course course name
     */
    async getAllUsersPerCourse(course: string): Promise<UserCourse[]>
    {
        return await this.connection
            .getRepository(UserCourse)
            .createQueryBuilder('userCourse')
            .where("userCourse.course = :course", {course: course})
            .getMany();
        // return userCourses.map(userCourse => {return {user: userCourse.user, role: userCourse.role};});
    }

    async getCoursesPerUser(user: string): Promise<Course[]>
    {
        const userCourses = await this.connection
            .getRepository(UserCourse)
            .createQueryBuilder('userCourse')
            .where("userCourse.user = :user", {user: user})
            .getMany();

        return userCourses.map(userCourse => {return <Course>{name: userCourse.course};});
    }
}