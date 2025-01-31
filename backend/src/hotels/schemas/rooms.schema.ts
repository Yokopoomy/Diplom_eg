import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Hotel } from './hotels.schema';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true })
  public hotel: Hotel;

  @Prop({ required: true })
  public title: string;

  @Prop()
  public description: string;

  @Prop()
  public images: string;

  @Prop({ required: true })
  public createdAt: Date;

  @Prop({ required: true })
  public updatedAt: Date;

  @Prop({ required: true })
  public isAnable: boolean;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
