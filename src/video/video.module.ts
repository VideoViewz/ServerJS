import { Module } from '@nestjs/common';
import { VideoService } from './video.new-service';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoSchema } from './schemas/video.schema';
import { VideoController } from './video.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Video', schema: VideoSchema }]),
    TypeOrmModule.forFeature([Video]),
  ],
  providers: [VideoService],
  controllers: [VideoController],
})
export class VideoModule { }
