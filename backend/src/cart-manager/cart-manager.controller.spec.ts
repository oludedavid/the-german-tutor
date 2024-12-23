import { Test, TestingModule } from '@nestjs/testing';
import { CartManagerController } from './cart-manager.controller';

describe('CartManagerController', () => {
  let controller: CartManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartManagerController],
    }).compile();

    controller = module.get<CartManagerController>(CartManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
