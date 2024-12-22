import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './authentication-manager/schemas/user.schema';
import { AuthenticationManagerModule } from './authentication-manager/authentication-manager.module';
import { AuthenticationManagerService } from './authentication-manager/authentication-manager.service';
import * as dotenv from 'dotenv';

dotenv.config({ path: process.cwd() + '/.env.dev' });

const { DB_CONNECTION_STRING, DB_USER, DB_PASSWORD } = process.env;

@Module({
  imports: [
    MongooseModule.forRoot(DB_CONNECTION_STRING, {
      auth: { username: DB_USER, password: DB_PASSWORD },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    AuthenticationManagerModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthenticationManagerService],
})
export class AppModule {}
