import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  IsEnum,
  IsOptional,
  IsArray,
  IsMongoId,
  IsBoolean,
} from 'class-validator';
import { Types } from 'mongoose';

export class RegisterUserDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly fullName: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsOptional()
  @IsEnum(['user', 'student', 'tutor'])
  readonly role: 'user' | 'student' | 'tutor';

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  readonly coursesEnrolled?: Types.ObjectId[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  readonly coursesTaught?: Types.ObjectId[];

  @IsOptional()
  @IsBoolean()
  readonly isVerified: boolean;
}
