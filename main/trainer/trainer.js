const Pokeball = require("../pokeball/pokeball");

class Trainer {
  constructor(name) {
    if (!name || typeof name !== "string") {
      throw new Error("Trainer must have a valid name");
    }
    this.name = name;
    this.belt = this.initializeBelt();
  }

  initializeBelt() {
    const BELT_SIZE = 6;
    return Array(BELT_SIZE)
      .fill(null)
      .map(() => new Pokeball());
  }

  catch(pokemon) {
    if (!pokemon) {
      throw new Error("Cannot catch undefined pokemon");
    }

    const firstEmptyPokeball = this.belt.find((pokeball) => pokeball.isEmpty());

    if (!firstEmptyPokeball) {
      console.log("No empty pokeballs available!");
      return false;
    }

    firstEmptyPokeball.throw(pokemon);
    return true;
  }

  getPokemon(pokemonName) {
    if (!pokemonName) return null;

    const pokeball = this.belt.find((ball) => ball.contains() === pokemonName);
    return pokeball ? pokeball.throw() : null;
  }
}

module.exports = Trainer;
