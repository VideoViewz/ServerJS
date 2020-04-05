import {Entity, PrimaryColumn, ManyToOne, Column, JoinColumn} from 'typeorm';
import {Course} from 'src/course/entities/course.entity';
import {ApiProperty} from '@nestjs/swagger';


@Entity()
export class Video
{
    @ApiProperty()
    @PrimaryColumn()
    url: string;

    @ApiProperty()
    @Column()
    videoName: string;

    @ApiProperty()
    @Column() // TODO many to one relationship later
    uploader: string;

    @ApiProperty()
    @ManyToOne(
        type => Course,
    )
    @JoinColumn({name: 'course'})
    @PrimaryColumn()
    course: string;
}
