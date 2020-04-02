import { Test, TestingModule } from '@nestjs/testing';
import { VideoService } from './video.service';
import { getModelToken } from '@nestjs/mongoose';
import { CreateVideoDto } from './interfaces/video.interface';

describe('VideoService', () => {
  let service: VideoService;

  beforeEach(async () => {
    function videoModel(dto: any) {
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
    const video: CreateVideoDto = {
      url: 'https://www.youtube.com/watch?v=T8r3cWM4JII',
      videoName: 'vid1',
      uploader: 'shucki',
      course: 'math',
    };
    expect(service.analyzeURL(video)).toEqual({
      url: 'https://www.youtube.com/embed/T8r3cWM4JII',
      videoName: 'vid1',
      uploader: 'shucki',
      course: 'math',
    });
  });

  it('should not alter the video link', () => {
    const video: CreateVideoDto = {
      url: 'https://www.youtube.com/embed/T8r3cWM4JII',
      videoName: 'vid1',
      uploader: 'shucki',
      course: 'math',
    };
    expect(service.analyzeURL(video)).toEqual(video);
  });
});
