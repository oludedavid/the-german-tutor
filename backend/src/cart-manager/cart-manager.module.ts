import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartManagerService } from './cart-manager.service';
import { CartManagerController } from './cart-manager.controller';
import { CartSchema } from './schemas/cart.schema';
import { AuthMiddleware } from 'src/authentication-manager/middleware/auth.middleware';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Cart', schema: CartSchema }])],
  providers: [CartManagerService],
  controllers: [CartManagerController],
})
export class CartManagerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('');
  }
}
