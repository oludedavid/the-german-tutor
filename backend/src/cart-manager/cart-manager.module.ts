import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartManagerService } from './cart-manager.service';
import { CartManagerController } from './cart-manager.controller';
import { CartSchema } from './schemas/cart.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Cart', schema: CartSchema }])],
  providers: [CartManagerService],
  controllers: [CartManagerController],
})
export class CartManagerModule {}
