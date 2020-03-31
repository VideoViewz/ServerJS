import { Test, TestingModule } from '@nestjs/testing';
import { DropboxController } from './dropbox.controller';
import { DropboxService } from './dropbox.service';

describe('Dropbox Controller', () => {
  let controller: DropboxController;
  let service: DropboxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DropboxController],
      providers: [DropboxService],
    }).compile();

    controller = module.get<DropboxController>(DropboxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
