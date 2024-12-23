import {
  IsString,
  IsNumber,
  IsArray,
  IsBoolean,
  IsOptional,
  IsMongoId,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateCourseDto {
  @IsString()
  readonly courseName: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly category: string;

  @IsNumber()
  readonly price: number;

  @IsNumber()
  @IsOptional()
  readonly quantity?: number = 1;

  @IsString()
  @IsOptional()
  readonly imageUrl?: string =
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'; // Optional, defaults to a placeholder image

  @IsString()
  readonly duration: string;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly tutors?: Types.ObjectId[] = [];

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly students?: Types.ObjectId[] = [];

  @IsBoolean()
  readonly available: boolean;

  @IsNumber()
  readonly maxNumberOfStudents: number;

  @IsNumber()
  @IsOptional()
  readonly numberOfEnrolledStudents?: number = 0;
}
