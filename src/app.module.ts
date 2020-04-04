import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoModule } from './video/video.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { CourseModule } from './course/course.module';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    TypeOrmModule.forRoot({
      type: 'postgres',
      ssl: {
        rejectUnauthorized: false,
      },
      url: process.env.DATABASE_URL,
      synchronize: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
    }),

    CourseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
