import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { PokemonSchema } from './entities/pokemon.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        // Si en vez de escribirlo así, lo saco desde "PokemonEntity.name", agarrará el nombre
        // de la clase, es decir, "pokemonentities"
        name: 'Pokemon', // Este es el nombre de la colección que se creará en mongodb
        schema: PokemonSchema,
      },
    ]),
  ],
  controllers: [PokemonController],
  providers: [PokemonService],
  exports: [PokemonService],
})
export class PokemonModule {}
