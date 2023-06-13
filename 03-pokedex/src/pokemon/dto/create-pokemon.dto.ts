import { IsPositive, Min, MinLength, IsString, IsInt } from 'class-validator';
export class CreatePokemonDto {
  @IsPositive()
  @IsInt()
  @Min(1)
  n0: number;

  @IsString()
  @MinLength(1)
  name: string;
}
