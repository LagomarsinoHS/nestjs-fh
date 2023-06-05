export const pokemonIds = [1, 20, 30, 34, 66]

interface IPokemon {
    id: number;
    name: string;
    age?: number
}

const bulbasaur: IPokemon = {
    id: 1,
    name: 'Bulbasaur'
}

const charmander: IPokemon = {
    id: 4,
    name: 'Charmander'
}


const pokemons: IPokemon[] = [];
pokemons.push(bulbasaur, charmander)
