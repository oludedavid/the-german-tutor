import { Test, TestingModule } from '@nestjs/testing';
import { CartManagerService } from './cart-manager.service';

describe('CartManagerService', () => {
  let service: CartManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartManagerService],
    }).compile();

    service = module.get<CartManagerService>(CartManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
