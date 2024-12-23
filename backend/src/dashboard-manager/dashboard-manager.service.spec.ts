import { Test, TestingModule } from '@nestjs/testing';
import { DashboardManagerService } from './dashboard-manager.service';

describe('DashboardManagerService', () => {
  let service: DashboardManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DashboardManagerService],
    }).compile();

    service = module.get<DashboardManagerService>(DashboardManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
