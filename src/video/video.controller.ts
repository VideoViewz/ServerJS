import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './interfaces/video.interface';
import { ApiParam } from '@nestjs/swagger';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('upload')
  async uploadVideo(@Body() createVideoDto: CreateVideoDto) {
    console.log(createVideoDto);
    const res = await this.videoService.create(createVideoDto);
    return res;
  }

  /**
   * Return a URL to the video
   * @param name video name
   */
  @Get(':course/:videoName')
  async getVideo(
    @Param('course') course,
    @Param('videoName') videoName,
  ): Promise<string> {
    const videoInfo = await this.videoService.find(course, videoName);
    return videoInfo.url;
  }

  /**
   * Return all course videos
   * @param course course name
   */
  @Get(':course')
  @ApiParam({ name: 'course' })
  async getAllCourseVideos(
    @Param('course') course,
  ): Promise<{ url: string; videoName: string }[]> {
    const videos = await this.videoService.findAll(course);
    return videos.map(video => {
      return { url: video.url, videoName: video.videoName };
    });
  }
}
