import { Entity, PrimaryColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { Course } from 'src/course/entities/course.entity';

@Entity()
export class Video {
    @PrimaryColumn()
    url: string;

    @Column()
    videoName: string;

    @Column() // TODO many to one relationship later
    uploader: string;

    @ManyToOne(
        type => Course,
    )
    @JoinColumn()
    @PrimaryColumn()
    course: string;
}
