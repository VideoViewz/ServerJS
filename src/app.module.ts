import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoModule } from './video/video.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { CourseModule } from './course/course.module';
import { UserModule } from './user/user.module';

config();

@Module({
  imports: [
    VideoModule,
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@videoviewzcluster0-tkxqx.mongodb.net/test?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: process.env.DB,
        useCreateIndex: true,
      },
    ),
    CourseModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
