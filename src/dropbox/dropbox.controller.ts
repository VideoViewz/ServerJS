import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DropboxService } from './dropbox.service';

@Controller('dropbox')
export class DropboxController {
  constructor(private readonly dropboxService: DropboxService) {}

  @Get()
  getUsers() {
    return this.dropboxService.findAllUsers();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadVideo(@UploadedFile() file) {
    console.log(file);
    this.dropboxService.uploadFile({
      name: file.originalname,
      data: file.buffer,
    });
  }
}
