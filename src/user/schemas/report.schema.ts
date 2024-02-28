import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ReportDocument = HydratedDocument<Report>;

@Schema({ timestamps: true, selectPopulatedPaths: false })
export class Report {
  @Prop({ required: true })
  reportType: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;
  
  @Prop({ type: Types.ObjectId, ref: 'User' })
  reporter: Types.ObjectId;

}


export const ReportSchema = SchemaFactory.createForClass(Report);