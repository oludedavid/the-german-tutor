import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { CourseManagerService } from './course-manager.service';
import { CreateCourseDto } from './dtos/create-course.dto';
import { UpdateCourseDto } from './dtos/update-course.dto';

@Controller('course')
export class CourseManagerController {
  constructor(private readonly courseManagerService: CourseManagerService) {}

  @Post()
  async createCourses(@Body() createCourseDtos: CreateCourseDto[]) {
    if (!Array.isArray(createCourseDtos)) {
      throw new BadRequestException('Input must be an array of course DTOs.');
    }
    const createdCourses =
      await this.courseManagerService.createCourses(createCourseDtos);

    return {
      message: 'Courses created successfully.',
      data: createdCourses,
    };
  }

  @Put(':courseId')
  async updateCourse(
    @Param('courseId') courseId: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.courseManagerService.updateCourse(courseId, updateCourseDto);
  }

  @Delete(':courseId')
  async deleteCourse(@Param('courseId') courseId: string) {
    return this.courseManagerService.deleteCourse(courseId);
  }

  @Get(':courseId')
  async getCourseById(@Param('courseId') courseId: string) {
    return this.courseManagerService.getCourseById(courseId);
  }

  @Get()
  async getAllCourses() {
    return this.courseManagerService.getAllCourses();
  }
}
