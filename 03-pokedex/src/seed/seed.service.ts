import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { IResponsePokemon } from './interfaces/poke-response-interface';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  constructor(private readonly pokemonService: PokemonService) {}

  async execute() {
    const { data } = await this.axios.get<IResponsePokemon>('https://pokeapi.co/api/v2/pokemon?limit=650');

    const mappedPoke: CreatePokemonDto[] = data.results.map((pokemon) => {
      const n0 = +pokemon.url.split('/').at(-2);
      return {
        n0,
        name: pokemon.name,
      };
    });

    for (const pokemon of mappedPoke) {
      this.pokemonService.create(pokemon);
    }

    return {
      msg: 'Seed executed succesfully.',
    };
  }
}
