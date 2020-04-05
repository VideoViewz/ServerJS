import {Entity, Column, ManyToOne, PrimaryColumn, JoinColumn} from 'typeorm';
import {User} from './user.entity';
import {Course} from '../../course/entities/course.entity';
import {ApiProperty} from '@nestjs/swagger';

@Entity()
export class UserCourse
{

    @ApiProperty()
    @PrimaryColumn()
    user: string;

    @ApiProperty()
    @PrimaryColumn()
    course: string;

    @ApiProperty()
    @Column()
    role: string;

    @ManyToOne(type => User, user => user.email)
    @JoinColumn({name: 'user'})
    userEmail: User;

    @ManyToOne(type => Course, course => course.name)
    @JoinColumn({name: 'course'})
    courseName: Course;
}