import { Module } from '@nestjs/common';
import { CourseManagerService } from './course-manager.service';
import { CourseManagerController } from './course-manager.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseOfferedSchema } from './schemas/courseOffered.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'CourseOffered', schema: CourseOfferedSchema },
    ]),
  ],
  providers: [CourseManagerService],
  controllers: [CourseManagerController],
})
export class CourseManagerModule {}
