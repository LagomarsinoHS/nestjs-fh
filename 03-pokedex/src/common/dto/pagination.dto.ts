import { Transform, Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';
import { toBoolean, toNumber } from '../helpers/value-transform.helper';

// Agregamos una clase transform al main.ts, esto igual lo usa de manera global, en algunos casos no queremos esto y otra opcion de hacerlo es así
export class paginationDTO {
  @IsOptional()
  @IsPositive()
  @Min(1)
  @Type(() => Number) // <------------
  limit?: number;

  //Otra forma, mas atractiva a mi parecer para no cambiarlo aqui es crear un archivo con funciones que genere esto y aplicarlo de la siguiente manera

  @Transform(({ value }) => toNumber(value))
  @IsOptional()
  @Min(0)
  offset?: number;

  @Transform(({ value }) => toBoolean(value))
  @IsOptional()
  isActive?: boolean;
}
