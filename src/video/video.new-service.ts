import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';
import { Repository, QueryFailedError } from 'typeorm';
import { courseToUpper } from 'src/helper-methods/helpers';
import { CreateVideoDto } from './interfaces/video.interface';

@Injectable()
export class VideoService {
    constructor(
        @InjectRepository(Video) private videoRepository: Repository<Video>,
    ) { }

    async create(video: Video): Promise<Video> {
        video.course = courseToUpper(video.course);
        try {
            return await this.videoRepository.save(video);
        }
        catch (e) {
            const error: QueryFailedError = e;
            console.log(error)
        }
    }

    async getAll() {
        return await this.videoRepository.find();
    }
}
