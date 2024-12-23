import { Test, TestingModule } from '@nestjs/testing';
import { CourseManagerService } from './course-manager.service';

describe('CourseManagerService', () => {
  let service: CourseManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseManagerService],
    }).compile();

    service = module.get<CourseManagerService>(CourseManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
