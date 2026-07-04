import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name!: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  price!: number;

  @Prop({ default: 0 })
  stockQuantity!: number;

  @Prop()
  imageUrl?: string;

  @Prop({ type: [String], default: [] })
  sizes!: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
