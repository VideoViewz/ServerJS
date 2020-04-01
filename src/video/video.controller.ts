import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Get,
  Param,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateVideoDto } from './interfaces/video.interface';
import { DropboxService } from '../dropbox/dropbox.service';

@Controller('video')
export class VideoController {
  constructor(
    private readonly videoService: VideoService,
    private readonly dropboxService: DropboxService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadVideo(
    @UploadedFile() file,
    @Body() createVideoDto: CreateVideoDto,
  ) {
    this.dropboxService.uploadFile({
      name: createVideoDto.name,
      data: file.buffer,
    });
    const res = await this.videoService.create(createVideoDto);
    return res;
  }

  /**
   * Return a URL to the video
   * @param name video name
   */
  @Get(':name')
  async getVideo(@Param('name') name): Promise<string> {
    const videoInfo = await this.videoService.find(name);
    return await this.dropboxService.getVideo(videoInfo.name);
  }
}
