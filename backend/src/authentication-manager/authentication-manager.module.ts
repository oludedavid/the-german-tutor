import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { AuthenticationManagerService } from './authentication-manager.service';
import { AuthenticationManagerController } from './authentication-manager.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES'),
          },
        };
      },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [AuthenticationManagerService, AuthMiddleware],
  controllers: [AuthenticationManagerController],
})
export class AuthenticationManagerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('auth/logout');
  }
}
