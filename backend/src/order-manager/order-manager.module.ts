import { Module } from '@nestjs/common';
import { OrderController } from './order-manager.controller';
import { OrderService } from './order-manager.service';
import { OrderSchema } from './schemas/order.schema';
import { CartSchema } from 'src/cart-manager/schemas/cart.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationManagerModule } from 'src/authentication-manager/authentication-manager.module';

@Module({
  imports: [
    AuthenticationManagerModule,
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: 'Cart', schema: CartSchema }]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderManagerModule {}
