import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { VideoService } from './video.new-service';
import { CreateVideoDto } from './interfaces/video.interface';
import { ApiParam, ApiCreatedResponse, ApiProperty } from '@nestjs/swagger';
import { Video } from './entities/video.entity';

class VideoResponse {
  @ApiProperty()
  url: string;

  @ApiProperty()
  videoName: string;
}

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) { }

  @Post('upload')
  async uploadVideo(@Body() video: Video) {
    console.log(video);
    const res = await this.videoService.create(video);
    return res;
  }

  // /**
  //  * Return a URL to the video
  //  * @param name video name
  //  */
  // @Get(':course/:videoName')
  // @ApiCreatedResponse({ description: 'Video url', type: String })
  // async getVideo(
  //   @Param('course') course,
  //   @Param('videoName') videoName,
  // ): Promise<string> {
  //   const videoInfo = await this.videoService.find(course, videoName);
  //   return videoInfo.url;
  // }

  // /**
  //  * Return all course videos
  //  * @param course course name
  //  */
  // @Get(':course')
  // @ApiParam({ name: 'course' })
  // @ApiCreatedResponse({
  //   description: 'Video url and name array',
  //   type: [VideoResponse],
  // })
  // async getAllCourseVideos(@Param('course') course): Promise<VideoResponse[]> {
  //   const videos = await this.videoService.findAll(course);
  //   return videos.map(video => {
  //     return { url: video.url, videoName: video.videoName };
  //   });
  // }
}
