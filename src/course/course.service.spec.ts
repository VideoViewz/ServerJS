import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './course.service';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Provider } from '@nestjs/common';
import { CourseDto } from './dto/course.dto';

describe('CourseService', () => {
  let service: CourseService;
  const mongooseProvider: Provider = {
    provide: getModelToken('Course'),
    useValue: this,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseService, mongooseProvider],
    }).compile();

    service = module.get<CourseService>(CourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should upper case first letter and lower case the rest', () => {
    expect(service.courseToUpper({ name: 'sHUCKI' }).name).toEqual('Shucki');
    expect(service.courseToUpper({ name: 'math' }).name).toEqual('Math');
    expect(service.courseToUpper({ name: 'Math' }).name).toEqual('Math');
  });
});
