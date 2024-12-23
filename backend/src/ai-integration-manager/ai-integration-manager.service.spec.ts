import { Test, TestingModule } from '@nestjs/testing';
import { AiIntegrationManagerService } from './ai-integration-manager.service';

describe('AiIntegrationManagerService', () => {
  let service: AiIntegrationManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AiIntegrationManagerService],
    }).compile();

    service = module.get<AiIntegrationManagerService>(AiIntegrationManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
