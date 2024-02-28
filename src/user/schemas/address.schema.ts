import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument,Types } from 'mongoose';
import { User } from './users.schema';

export type AddressDocument = HydratedDocument<Address>;


@Schema({timestamps: true})
export class Address{
  @Prop({type: Types.ObjectId, ref: 'User'})
  user: Types.ObjectId
  @Prop()
  address: string;
  @Prop({type: String, default: ''})
  description: string;
  @Prop()
  state: string;
  @Prop()
  city: string;
  @Prop({default: false})
  default: boolean;
  @Prop({type: String, default: ''})
  landmark: string;
  @Prop()
  type: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
