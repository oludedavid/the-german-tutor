import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DashbordDocument = Dashboard & Document;

@Schema({ timestamps: true })
export class Dashboard {
  @Prop({
    type: Types.ObjectId,
    required: true,
  })
  owner: string;
}

export const DashboardSchema = SchemaFactory.createForClass(Dashboard);
