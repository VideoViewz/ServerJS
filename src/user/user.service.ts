import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {Repository, Connection} from 'typeorm';
import {UserCourse} from './entities/user_course.entity';

@Injectable()
export class UserService
{
    constructor (@InjectRepository(User) private userRepository: Repository<User>, private connection: Connection) {}

    async createUser(user: User): Promise<User>
    {
        return await this.userRepository.save(user);
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

}
