import { Test, TestingModule } from '@nestjs/testing';
import { CourseManagerController } from './course-manager.controller';

describe('CourseManagerController', () => {
  let controller: CourseManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseManagerController],
    }).compile();

    controller = module.get<CourseManagerController>(CourseManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
