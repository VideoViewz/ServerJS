import {Entity, PrimaryColumn, OneToMany} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';
import {UserCourse} from 'src/user/entities/user_course.entity';

@Entity()
export class Course
{

  @ApiProperty()
  @PrimaryColumn()
  name: string;

  @OneToMany(type => UserCourse, userCourse => userCourse.course)
  userCourse: UserCourse[];
}
