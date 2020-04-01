import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DropboxService } from './dropbox/dropbox.service';
import { DropboxController } from './dropbox/dropbox.controller';
import { VideoModule } from './video/video.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';

config();

@Module({
  imports: [
    VideoModule,
    MongooseModule.forRoot(
      `mongodb+srv://Shucki:${process.env.MONGO_PASS}@videoviewzcluster0-tkxqx.mongodb.net/test?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'videoViewz' },
    ),
  ],
  controllers: [AppController, DropboxController],
  providers: [AppService, DropboxService],
  exports: [DropboxService],
})
export class AppModule {}
