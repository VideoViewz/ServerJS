import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video, CreateVideoDto } from './interfaces/video.interface';

@Injectable()
export class VideoService {
  constructor(@InjectModel('Video') private videoModel: Model<Video>) {}

  /**
   * Create a new video entry in db
   * @param createVideoDto video info
   */
  async create(createVideoDto: CreateVideoDto): Promise<Video> {
    const createdVideo = new this.videoModel(createVideoDto);
    return createdVideo.save();
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
}
