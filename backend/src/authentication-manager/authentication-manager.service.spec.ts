import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationManagerService } from './authentication-manager.service';

describe('AuthenticationManagerService', () => {
  let service: AuthenticationManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthenticationManagerService],
    }).compile();

    service = module.get<AuthenticationManagerService>(
      AuthenticationManagerService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
