import {Entity, PrimaryColumn} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';

@Entity()
export class Course
{

  @ApiProperty()
  @PrimaryColumn()
  name: string;
}
