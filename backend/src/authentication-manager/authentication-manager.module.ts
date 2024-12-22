import { Module } from '@nestjs/common';
import { AuthenticationManagerService } from './authentication-manager.service';
import { AuthenticationManagerController } from './authentication-manager.controller';

@Module({
  providers: [AuthenticationManagerService],
  controllers: [AuthenticationManagerController],
})
export class AuthenticationManagerModule {}
