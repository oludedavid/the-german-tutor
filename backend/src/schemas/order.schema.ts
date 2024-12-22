import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'User',
  })
  owner: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'Cart',
  })
  cart: Types.ObjectId;

  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  totalAmount: number;

  @Prop({
    type: String,
    enum: ['pending', 'shipped', 'delivered', 'canceled'],
    default: 'pending',
  })
  orderStatus: string;

  @Prop({
    type: String,
    enum: ['credit_card', 'paypal', 'flutterwave', 'bank_transfer'],
    required: true,
  })
  paymentMethod: string;

  @Prop({
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  })
  paymentStatus: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
