import { Test, TestingModule } from '@nestjs/testing';
import { DashboardManagerController } from './dashboard-manager.controller';

describe('DashboardManagerController', () => {
  let controller: DashboardManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardManagerController],
    }).compile();

    controller = module.get<DashboardManagerController>(
      DashboardManagerController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
