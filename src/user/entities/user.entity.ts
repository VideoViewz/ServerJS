import {Entity, PrimaryColumn, Column, OneToMany} from 'typeorm';
import {UserCourse} from './user_course.entity';
import {ApiProperty} from '@nestjs/swagger';

@Entity()
export class User
{

    @ApiProperty()
    @PrimaryColumn()
    email: string;

    @ApiProperty()
    @Column()
    name: string;

    @OneToMany(type => UserCourse, userCourse => userCourse.user)
    userCourse: UserCourse[];
}