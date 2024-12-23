import { Module } from '@nestjs/common';
import { AiIntegrationManagerService } from './ai-integration-manager.service';
import { AiIntegrationManagerController } from './ai-integration-manager.controller';

@Module({
  providers: [AiIntegrationManagerService],
  controllers: [AiIntegrationManagerController]
})
export class AiIntegrationManagerModule {}
