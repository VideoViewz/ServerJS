import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {VideoModule} from './video/video.module';
import {config} from 'dotenv';
import {CourseModule} from './course/course.module';
import {TypeOrmModule} from '@nestjs/typeorm';

config();

@Module({
  imports: [
    VideoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      ssl: {
        rejectUnauthorized: false,
      },
      url: process.env.DATABASE_URL,
      synchronize: true,
      entities: [ 'dist/**/*.entity{.ts,.js}' ],
    }),

    CourseModule,
  ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class AppModule {}
