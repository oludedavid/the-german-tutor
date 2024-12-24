import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartManagerService } from './cart-manager.service';
import { CartManagerController } from './cart-manager.controller';
import { CartSchema } from './schemas/cart.schema';
import { AuthMiddleware } from 'src/authentication-manager/middleware/auth.middleware';
import { AuthenticationManagerModule } from 'src/authentication-manager/authentication-manager.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Cart', schema: CartSchema }]),
    AuthenticationManagerModule,
  ],
  providers: [CartManagerService],
  controllers: [CartManagerController],
})
// export class CartManagerModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(AuthMiddleware).forRoutes('');
//   }
// }
export class CartManagerModule {}
