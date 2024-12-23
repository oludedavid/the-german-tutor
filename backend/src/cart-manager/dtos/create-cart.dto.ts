import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsMongoId,
  IsInt,
  Min,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';

class CourseItemDto {
  @IsMongoId()
  @IsNotEmpty()
  courseOfferedId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsPositive()
  price: number;
}

export class CreateCartDto {
  @IsMongoId()
  @IsNotEmpty()
  owner: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CourseItemDto)
  courses: CourseItemDto[];
}
