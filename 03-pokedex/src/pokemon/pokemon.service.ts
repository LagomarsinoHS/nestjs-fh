import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { PokemonEntity } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { paginationDTO } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel('Pokemon') // Aqui hay que pasarle el nombre que definimos en el pokemon.module, en el caso de que no haya usado la forma de "clase.name", tendré que poner el string como aqui
    private readonly pokemonModel: Model<PokemonEntity>, // En el modelo hay que pasarle la CLASE
  ) {}

  async findAll(queryParameters: paginationDTO) {
    const { limit = 10, offset = 1 } = queryParameters;

    const pagination = (offset - 1) * limit;
    const [total, pokemons] = await Promise.all([
      this.pokemonModel.countDocuments(),
      this.pokemonModel.find().select('-__v').sort({ no: 1 }).limit(limit).skip(pagination),
    ]);

    const totalPages = Math.ceil(total / limit);
    const currentPage = Math.ceil(offset / limit);

    const paginar = {
      next: offset + 1,
      currentPage,
      total,
      totalPages,
    };
    return { pokemons, paginar };
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

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
      const newPokemon = await this.pokemonModel.create(createPokemonDto);
      return newPokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async createBatch(createPokemonDto: CreatePokemonDto[]) {
    try {
      await this.pokemonModel.deleteMany({});
      await this.pokemonModel.insertMany(createPokemonDto);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);

    try {
      await pokemon.updateOne(updatePokemonDto);
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string): Promise<void> {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });

    if (!deletedCount) {
      throw new BadRequestException(`Pokemon with id ${id} not found`);
    }
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon exist in DB, ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't update pokemon - check logs`);
  }
}
