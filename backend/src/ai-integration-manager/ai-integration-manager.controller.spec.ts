import { Test, TestingModule } from '@nestjs/testing';
import { AiIntegrationManagerController } from './ai-integration-manager.controller';

describe('AiIntegrationManagerController', () => {
  let controller: AiIntegrationManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiIntegrationManagerController],
    }).compile();

    controller = module.get<AiIntegrationManagerController>(AiIntegrationManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
