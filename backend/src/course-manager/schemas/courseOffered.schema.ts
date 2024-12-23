import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CourseOfferedDocument = CourseOffered & Document;

@Schema({ timestamps: true })
export class CourseOffered {
  @Prop({ required: true })
  courseName: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, default: 1 })
  quantity: number;

  @Prop({
    required: true,
    default:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  })
  imageUrl: string;

  @Prop({ required: true })
  duration: string;

  @Prop({
    type: [Types.ObjectId],
    ref: 'User',
    default: [],
  })
  tutors: Types.ObjectId[];

  @Prop({
    type: [Types.ObjectId],
    ref: 'User',
    default: [],
  })
  students: Types.ObjectId[];

  @Prop({ required: true })
  available: boolean;

  @Prop({ required: true })
  maxNumberOfStudents: number;

  @Prop({ default: 0 })
  numberOfEnrolledStudents: number;
}

export const CourseOfferedSchema = SchemaFactory.createForClass(CourseOffered);
