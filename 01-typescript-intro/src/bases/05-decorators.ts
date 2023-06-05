const MyDecorator = () => {
    return (target: Function) => {
        console.log(target);
        return NewPokemon

    }
}


class NewPokemon {
    constructor(
        public readonly id: number,
        public readonly name: string
    ) { }

    scream() {
        console.log(`Don't want scream!!!`);
    }

    speak() {
        console.log(`Don't want to talk`);
    }
}


// Lo que hizo este decorador es que cuando inicia esto, lee la clase pero lo que devuelve es la "NewPokemon", entonces de cierta manera
// la sobrescribimos
@MyDecorator()
export class Pokemon {

    constructor(
        public readonly id: number,
        public readonly name: string
    ) { }

    scream() {
        console.log(`${this.name}!!!`.toUpperCase);
    }

    speak() {
        console.log(`${this.name} ${this.name}`);
    }
}


export const charmander = new Pokemon(4, 'Charmander')
charmander.scream()
charmander.speak()