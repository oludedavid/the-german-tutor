import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema()
export class Cart {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  owner: Types.ObjectId;

  @Prop({
    type: [
      {
        courseOfferedId: {
          type: Types.ObjectId,
          ref: 'CourseOffered',
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    default: [],
  })
  courses: {
    courseOfferedId: Types.ObjectId;
    name: string;
    quantity: number;
    price: number;
  }[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
