import { Test, TestingModule } from '@nestjs/testing';
import { VideoService } from './video.service';
import { getModelToken } from '@nestjs/mongoose';
import { CreateVideoDto, Video } from './interfaces/video.interface';

const VIDEO: CreateVideoDto = {
  url: 'https://www.youtube.com/watch?v=T8r3cWM4JII',
  videoName: 'vid1',
  uploader: 'shucki',
  course: 'math',
};
const VIDEO_EMBEDED: CreateVideoDto = {
  url: 'https://www.youtube.com/embed/T8r3cWM4JII',
  videoName: 'vid1',
  uploader: 'shucki',
  course: 'math',
};

const VIDEO_EMBEDED_UPPER: CreateVideoDto = {
  url: 'https://www.youtube.com/embed/T8r3cWM4JII',
  videoName: 'vid1',
  uploader: 'shucki',
  course: 'Math',
};

describe('VideoService', () => {
  let service: VideoService;

  beforeEach(async () => {
    function videoModel(dto: Video) {
      this.data = dto;
      this.save = () => {
        return this.data;
      };
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VideoService,
        {
          provide: getModelToken('Video'),
          useValue: videoModel,
        },
      ],
    }).compile();

    service = module.get<VideoService>(VideoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an emdedable youtube video link', () => {
    expect(service.analyzeURL(VIDEO)).toEqual(VIDEO_EMBEDED);
  });

  it('should not alter the video link', () => {
    expect(service.analyzeURL(VIDEO_EMBEDED)).toEqual(VIDEO_EMBEDED);
  });

  it('should create a new video entry in db', async () => {
    expect(await service.create(VIDEO)).toEqual(VIDEO_EMBEDED_UPPER);
  });
});
