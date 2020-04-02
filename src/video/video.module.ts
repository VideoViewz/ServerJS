import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoSchema } from './schemas/video.schema';
import { VideoController } from './video.controller';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Video', schema: VideoSchema }]),
  ],
  providers: [VideoService],
  controllers: [VideoController],
})
export class VideoModule {}
