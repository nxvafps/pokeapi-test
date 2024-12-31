class Pokeball {
  constructor() {
    this.storedPokemon = null;
  }

  isEmpty() {
    return this.storedPokemon === null;
  }

  contains() {
    return this.isEmpty() ? "empty..." : this.storedPokemon.name;
  }

  throw(pokemon) {
    if (pokemon) {
      if (this.isEmpty()) {
        this.storedPokemon = pokemon;
        console.log(`You caught ${pokemon.name}!`);
        return pokemon;
      } else {
        console.log(
          `This pokeball already contains ${this.storedPokemon.name}!`
        );
        return pokemon;
      }
    } else {
      if (this.isEmpty()) {
        console.log(`The pokeball is empty!`);
        return null;
      } else {
        console.log(`Go ${this.storedPokemon.name}!! I choose you!`);
        return this.storedPokemon;
      }
    }
  }
}

module.exports = Pokeball;
