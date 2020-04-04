import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoError } from 'mongodb';
import { Video, CreateVideoDto } from './interfaces/video.interface';
import { courseToUpper } from '../helper-methods/helpers';

@Injectable()
export class VideoService {
  constructor(@InjectModel('Video') private videoModel: Model<Video>) {}

  /**
   * Create a new video entry in db
   * @param createVideoDto video info
   */
  async create(
    createVideoDto: CreateVideoDto,
  ): Promise<Video | { error: string }> {
    try {
      createVideoDto.course = courseToUpper(createVideoDto.course);
      createVideoDto = this.analyzeURL(createVideoDto);
      const createdVideo = new this.videoModel(createVideoDto);
      return await createdVideo.save();
    } catch (e) {
      const error = <MongoError>e;
      if (error.errmsg.startsWith('E11000 duplicate key error collection:')) {
        return {
          error: 'Video already exists',
        };
      }
      return {
        error: 'An Error ocurred',
      };
    }
  }

  /**
   *
   * @param course course name
   * @param videoName retrieve a video info
   */
  async find(course: string, videoName: string): Promise<Video> {
    try {
      return await this.videoModel
        .findOne({ name: videoName, course: course })
        .exec();
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Find all videos for a specific course
   * @param course course name
   */
  async findAll(course: string) {
    try {
      return await this.videoModel.find({ course: course }).exec();
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Check if the video string is embedable (for youtube videos)
   * @param createVideoDto the video info to upload
   */
  analyzeURL(createVideoDto: CreateVideoDto) {
    if (!createVideoDto.url.includes('/embed/')) {
      const urlArr = createVideoDto.url.split('/watch?v=');
      const newUrl = `${urlArr[0]}/embed/${urlArr[1]}`;
      createVideoDto = {
        ...createVideoDto,
        url: newUrl,
      };
    }
    return createVideoDto;
  }
}
