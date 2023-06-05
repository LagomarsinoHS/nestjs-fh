import { Move, PokeapiResponse } from "../interfaces/pokeapi-response.interface";
import { HttpAdapter, PokeApiAdapter, PokeApiFetchAdapter } from "../api/pokeApi.adapter";



export class Pokemon {

    get imageUrl(): string {
        return `https://pokemon.com/${this.id}.jpg`
    }

    constructor(
        public readonly id: number,
        public readonly name: string,
        //todo inyectar dependencia de axios
        //private readonly http: PokeApiAdapter
        private readonly http: HttpAdapter // Indicandole esto podré usar ambos adaptadores, si usaba la anterior me pedía que fuera la especifica
    ) { }


    scream() {
        console.log(`${this.name.toUpperCase()}!!!`);
    }

    speak() {
        console.log(`${this.name} ${this.name}`);
    }

    async getMoves(): Promise<Move[]> {
        const data = await this.http.get<PokeapiResponse>(`https://pokeapi.co/api/v2/pokemon/${this.id}`)
        console.log(data.moves);
        return data.moves
    }
}

const pokeApiAxios = new PokeApiAdapter()
const pokeApiFetch = new PokeApiFetchAdapter()
export const charmander = new Pokemon(4, 'Charmander', pokeApiAxios)
charmander.scream()
charmander.speak()
charmander.getMoves()

export const bulbasaur = new Pokemon(1, 'Bulbasaur', pokeApiFetch)
bulbasaur.scream()
bulbasaur.speak()
bulbasaur.getMoves()