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