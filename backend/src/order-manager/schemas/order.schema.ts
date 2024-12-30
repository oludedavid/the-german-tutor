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
  ownerId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'Cart',
  })
  cartId: Types.ObjectId;

  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  totalAmount: number;

  @Prop({
    type: String,
    enum: ['pending', 'success', 'canceled', 'failed'],
    default: 'pending',
  })
  orderStatus: string;

  @Prop({
    type: String,
    enum: ['paypal', 'paystack'],
    default: 'paypal',
  })
  paymentMethod: string;

  @Prop({
    type: String,
    enum: ['pending', 'success', 'canceled', 'failed'],
    default: 'pending',
  })
  paymentStatus: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
