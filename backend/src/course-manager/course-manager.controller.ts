import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Get,
} from '@nestjs/common';
import { CourseManagerService } from './course-manager.service';
import { CreateCourseDto } from './dtos/create-course.dto';
import { UpdateCourseDto } from './dtos/update-course.dto';

@Controller('course')
export class CourseManagerController {
  constructor(private readonly courseManagerService: CourseManagerService) {}

  // Endpoint to create a new course
  @Post()
  async createCourse(@Body() createCourseDto: CreateCourseDto) {
    return this.courseManagerService.createCourse(createCourseDto);
  }

  // Endpoint to update an existing course
  @Put(':courseId')
  async updateCourse(
    @Param('courseId') courseId: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.courseManagerService.updateCourse(courseId, updateCourseDto);
  }

  // Endpoint to delete a course
  @Delete(':courseId')
  async deleteCourse(@Param('courseId') courseId: string) {
    return this.courseManagerService.deleteCourse(courseId);
  }

  // Endpoint to get a specific course by ID
  @Get(':courseId')
  async getCourseById(@Param('courseId') courseId: string) {
    return this.courseManagerService.getCourseById(courseId);
  }

  // Endpoint to get all courses
  @Get()
  async getAllCourses() {
    return this.courseManagerService.getAllCourses();
  }
}
