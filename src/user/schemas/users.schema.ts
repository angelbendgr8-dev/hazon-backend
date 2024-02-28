import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Review } from './reviews.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop({ defaultValue: null })
  mobileNumber: string;

  @Prop({ type: 'boolean', default: false })
  emailVerified: boolean;

  @Prop({ type: 'boolean', default: false })
  mobileVerified: boolean;

  @Prop()
  password: string;

  @Prop()
  clientId: string;

  @Prop({ type: String,default: null })
  profilePics: string;


  @Prop({ type: String, default: null })
  dob: null;

  @Prop({ type: String, default: null })
  info: null;
}

interface follow {
  id: Types.ObjectId;
  time: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
