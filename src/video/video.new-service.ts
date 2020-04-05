import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Video} from './entities/video.entity';
import {Repository, Connection} from 'typeorm';
import {courseToUpper, analyzeURL} from 'src/helper-methods/helpers';

@Injectable()
export class VideoService
{
    constructor (
        @InjectRepository(Video) private videoRepository: Repository<Video>,
        private connection: Connection,
    ) {}

    async create(video: Video)
    {
        video.course = courseToUpper(video.course);
        video.url = analyzeURL(video.url);
        try
        {
            return await this.videoRepository.save(video);
        } catch (e)
        {
            const error = e;
            console.log(error);
            if (
                error.message.startsWith(
                    'duplicate key value violates unique constraint',
                )
            )
            {
                return {
                    error: `Video: ${video.url} already exists in ${video.course} course`,
                };
            } else if (error.constraint.startsWith('FK_'))
            {
                return {error: `No course named ${video.course}`};
            }
        }
    }

    async getAll()
    {
        return await this.videoRepository.find();
    }

    /**
     *
     * @param course course name
     */
    async findAll(course: string)
    {
        course = courseToUpper(course);
        const vidoes = await this.connection
            .getRepository(Video)
            .createQueryBuilder('video')
            .where('video.course = :course', {course: course})
            .getMany();
        return vidoes;
    }
}
