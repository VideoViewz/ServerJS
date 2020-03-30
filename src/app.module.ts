import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DropboxService } from './dropbox/dropbox.service';
import { DropboxController } from './dropbox/dropbox.controller';

@Module({
  imports: [],
  controllers: [AppController, DropboxController],
  providers: [AppService, DropboxService],
})
export class AppModule {}
