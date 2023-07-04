import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { IResponsePokemonApi } from './interfaces/poke-response-interface';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { AxiosAdapter } from 'src/common/adapters/axios-adapter';

@Injectable()
export class SeedService {
  constructor(
    private readonly pokemonService: PokemonService,
    // Inserté esta dependencia para envolver en mi clase custom axios, por si a futuro cambia algo, solo lo cambio allí
    private readonly http: AxiosAdapter,
  ) {}

  async execute() {
    const { results } = await this.http.get<IResponsePokemonApi>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    const pokemonsToInsert: CreatePokemonDto[] = results.map(({ name, url }) => ({
      n0: +url.split('/').at(-2),
      name,
    }));

    await this.pokemonService.createBatch(pokemonsToInsert);
    return {
      msg: 'Seed executed succesfully.',
    };
  }
}
