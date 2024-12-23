import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationManagerModule } from './authentication-manager/authentication-manager.module';
import { CartManagerModule } from './cart-manager/cart-manager.module';
import { OrderManagerModule } from './order-manager/order-manager.module';
import { DashboardManagerModule } from './dashboard-manager/dashboard-manager.module';
import { CourseManagerModule } from './course-manager/course-manager.module';
import { ConfigModule } from '@nestjs/config';
import { AiIntegrationManagerModule } from './ai-integration-manager/ai-integration-manager.module';
import * as dotenv from 'dotenv';

dotenv.config({ path: process.cwd() + '/.env.dev' });

const { DB_CONNECTION_STRING, DB_USER, DB_PASSWORD } = process.env;

@Module({
  imports: [
    MongooseModule.forRoot(DB_CONNECTION_STRING, {
      auth: { username: DB_USER, password: DB_PASSWORD },
    }),

    AuthenticationManagerModule,
    CartManagerModule,
    OrderManagerModule,
    DashboardManagerModule,
    CourseManagerModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AiIntegrationManagerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
