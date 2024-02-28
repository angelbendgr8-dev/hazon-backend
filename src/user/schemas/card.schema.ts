import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument,Types } from 'mongoose';
import { User } from './users.schema';

export type BankDetailDocument = HydratedDocument<BankDetail>;


@Schema({timestamps: true})
export class BankDetail{
  @Prop({type: Types.ObjectId, ref: 'User'})
  user: Types.ObjectId

  @Prop({type: String, })
  bankName: string;

  @Prop({type: String, })
  accountName: string;

  @Prop({type: String, })
  accountNumber: string;

  @Prop({type: String, })
  logo: string;
}

export const BankDetailSchema = SchemaFactory.createForClass(BankDetail);
