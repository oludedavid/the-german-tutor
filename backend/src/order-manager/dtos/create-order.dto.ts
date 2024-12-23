import { IsEnum, IsNumber, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class CreateOrderDto {
  @IsMongoId()
  readonly owner: Types.ObjectId;

  @IsMongoId()
  readonly cart: Types.ObjectId;

  @IsNumber()
  readonly totalAmount: number;

  @IsEnum(['credit_card', 'paypal', 'flutterwave', 'bank_transfer'])
  readonly paymentMethod: string;

  @IsEnum(['pending', 'completed', 'failed'])
  readonly paymentStatus: string;
}
