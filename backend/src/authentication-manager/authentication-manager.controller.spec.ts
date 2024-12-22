import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationManagerController } from './authentication-manager.controller';

describe('AuthenticationManagerController', () => {
  let controller: AuthenticationManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationManagerController],
    }).compile();

    controller = module.get<AuthenticationManagerController>(
      AuthenticationManagerController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
