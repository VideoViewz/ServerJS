import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './interfaces/video.interface';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('upload')
  async uploadVideo(@Body() createVideoDto: CreateVideoDto) {
    // this.dropboxService.uploadFile({
    //   name: createVideoDto.name,
    //   data: file.buffer,
    // });
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
    // return await this.dropboxService.getVideo(videoInfo.name);
  }
}
