import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  readonly fullName: string;
  readonly email: string;
  readonly password: string;
  readonly isVerified: boolean;
  readonly role: 'user' | 'student' | 'tutor';
  readonly courseEnrolled: Types.ObjectId[];
  readonly courseTaught: Types.ObjectId[];
}
