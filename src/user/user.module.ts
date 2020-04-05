import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {UserCourse} from './entities/user_course.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ User ]) ],
  providers: [ UserService ],
  controllers: [ UserController ]
})
export class UserModule {}
