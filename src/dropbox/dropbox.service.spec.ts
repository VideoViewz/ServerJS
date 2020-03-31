import { Test, TestingModule } from '@nestjs/testing';
import { DropboxService } from './dropbox.service';
import { FileData } from '../file-data.interface';
import { Buffer } from 'buffer';

describe('DropboxService', () => {
  let service: DropboxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DropboxService],
    }).compile();

    service = module.get<DropboxService>(DropboxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should split up a file into chunks', () => {
    const bufferArr = Buffer.alloc(10000000, 'a');
    const file: FileData = {
      name: 'Shucki',
      data: bufferArr,
    };
    expect(service.chunckMaker(file)).toHaveLength(2);
  });
});
