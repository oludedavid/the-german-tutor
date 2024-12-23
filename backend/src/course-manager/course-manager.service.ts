import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CourseOffered,
  CourseOfferedDocument,
} from './schemas/courseOffered.schema';
import { CreateCourseDto } from './dtos/create-course.dto';
import { UpdateCourseDto } from './dtos/update-course.dto';

@Injectable()
export class CourseManagerService {
  constructor(
    @InjectModel(CourseOffered.name)
    private courseModel: Model<CourseOfferedDocument>,
  ) {}

  // Create a new course
  async createCourse(createCourseDto: CreateCourseDto): Promise<CourseOffered> {
    const course = new this.courseModel(createCourseDto);
    return course.save();
  }

  // Update an existing course
  async updateCourse(
    courseId: string,
    updateCourseDto: UpdateCourseDto,
  ): Promise<CourseOffered> {
    return this.courseModel.findByIdAndUpdate(courseId, updateCourseDto, {
      new: true,
    });
  }

  // Delete a course
  async deleteCourse(courseId: string): Promise<void> {
    await this.courseModel.findByIdAndDelete(courseId);
  }

  // Fetch a course by its ID
  async getCourseById(courseId: string): Promise<CourseOffered | null> {
    return this.courseModel.findById(courseId).exec();
  }

  // Fetch all courses
  async getAllCourses(): Promise<CourseOffered[]> {
    return this.courseModel.find().exec();
  }
}
