import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ enum: ['user', 'student', 'tutor'], default: 'user' })
  role: 'user' | 'student' | 'tutor';

  @Prop({ type: [Types.ObjectId], ref: 'CourseOffered', default: [] })
  courseEnrolled: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'CourseOffered', default: [] })
  courseTaught: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
