import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { PokemonEntity } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel('Pokemon') // Aqui hay que pasarle el nombre que definimos en el pokemon.module, en el caso de que no haya usado la forma de "clase.name", tendré que poner el string como aqui
    private readonly pokemonModel: Model<PokemonEntity>, // En el modelo hay que pasarle la CLASE
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
      const newPokemon = await this.pokemonModel.create(createPokemonDto);
      return newPokemon;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`Pokemon exist in DB, ${JSON.stringify(error.keyValue)}`);
      }
      console.log(error);
      throw new InternalServerErrorException(`Can't create pokemon - check logs`);
    }
  }

  findAll() {
    return this.pokemonModel.find();
  }

  async findOne(term: string) {
    let pokemon: PokemonEntity;

    // Verificacion por N0
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ n0: term });
    }

    // Verificacion por MongoID
    // isValidObjectId viene de mongoose y nos da un true o false si es un uuid de mongo
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }
    // Verificacion por Name
    if (!pokemon) pokemon = await this.pokemonModel.findOne({ name: term.toLocaleLowerCase().trim() });

    // Si no se encuentra el pokemon
    if (!pokemon) throw new NotFoundException(`Pokemon with id|name|n0 "${term}" not found.`);

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    await pokemon.updateOne(updatePokemonDto);
    return { ...pokemon.toJSON(), ...updatePokemonDto };
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
