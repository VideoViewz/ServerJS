import { Test, TestingModule } from '@nestjs/testing';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { Provider } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';

describe('Course Controller', () => {
  const mongooseProvider: Provider = {
    provide: getModelToken('Course'),
    useValue: this,
  };

  let controller: CourseController;
  let service: CourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseController],
      providers: [CourseService, mongooseProvider],
    }).compile();

    controller = module.get<CourseController>(CourseController);
    service = module.get<CourseService>(CourseService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
