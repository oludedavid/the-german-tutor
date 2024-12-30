import { IsEnum, IsNumber, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class CreateOrderDto {
  @IsMongoId()
  readonly ownerId: Types.ObjectId;

  @IsMongoId()
  readonly cartId: Types.ObjectId;

  @IsNumber()
  readonly totalAmount: number;
}
