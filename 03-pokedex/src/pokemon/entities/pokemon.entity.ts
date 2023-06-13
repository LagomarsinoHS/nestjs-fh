import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Decorador para indicar que será un esquema de mongo
@Schema()
// El extends Document es para que la clase tenga los metodos asociados a un documento de Mongo
export class PokemonEntity extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  name: string;
  @Prop({
    unique: true,
    index: true,
  })
  n0: number;
}

export const PokemonSchema = SchemaFactory.createForClass(PokemonEntity);
