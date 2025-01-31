import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, {
  Document,
  Schema as MongooseSchema,
  ObjectId,
} from 'mongoose';
import { Message } from './Message.schema';
import { User } from 'src/users/schemas/user.schema';

export type SupportRequestDocument = SupportRequest & Document;

@Schema()
export class SupportRequest {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  public user: User;

  @Prop({ required: true })
  public createdAt: Date;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Message' })
  public messages: any;

  @Prop()
  public isActive: boolean;
}

export const SupportRequestSchema =
  SchemaFactory.createForClass(SupportRequest);
