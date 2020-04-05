import {Entity, Column, ManyToOne, PrimaryColumn, JoinColumn} from 'typeorm';
import {User} from './user.entity';
import {Course} from '../../course/entities/course.entity';

@Entity()
export class UserCourse
{

    @PrimaryColumn()
    user: string;

    @PrimaryColumn()
    course: string;

    @Column()
    role: string;

    @ManyToOne(type => User, user => user.email)
    @JoinColumn({name: 'user'})
    userEmail: User;

    @ManyToOne(type => Course, course => course.name)
    @JoinColumn({name: 'course'})
    courseName: Course;
}