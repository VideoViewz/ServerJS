import {Entity, PrimaryColumn, Column, OneToMany} from 'typeorm';
import {UserCourse} from './user_course.entity';

@Entity()
export class User
{

    @PrimaryColumn()
    email: string;

    @Column()
    name: string;

    @OneToMany(type => UserCourse, userCourse => userCourse.user)
    userCourse: UserCourse[];
}