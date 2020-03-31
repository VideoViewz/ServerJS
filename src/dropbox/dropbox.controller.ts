import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DropboxService } from './dropbox.service';

@Controller('dropbox')
export class DropboxController {
  constructor(private readonly dropboxService: DropboxService) {}

  // @Get()
  // getUsers() {
  //   return this.dropboxService.findAllUsers();
  // }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadVideo(@UploadedFile() file) {
    console.log(file);
    this.dropboxService.uploadFile({
      name: file.originalname,
      data: file.buffer,
    });
    return 'Uploading...';
  }

  @Get('retrieve')
  async getVideo(@Query('video') video) {
    const videoLink = await this.dropboxService.getVideo(video);
    return videoLink;
  }
}
