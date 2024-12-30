const getPokemon = require("./utility/getPokemon");
const { calculatePokemonStats } = require("./utility/calculatePokemonStats");

class Pokemon {
  constructor() {
    this.name = null;
    this.number = null;
    this.abilities = null;
    this.type1 = null;
    this.type2 = null;
    this.stats = {
      ivs: {},
      base: {},
      final: {},
    };
    this.moves = [];
  }

  async initialize(name, level = 50, ivs = {}) {
    try {
      const data = await getPokemon(name);
      this.name = data.name;
      this.number = data.number;
      this.abilities = data.abilities;
      this.type1 = data.types[0];
      this.type2 = data.types[1];
      this.stats.ivs = {
        hp: ivs.hp || 15,
        attack: ivs.attack || 15,
        defence: ivs.defence || 15,
        specialAttack: ivs.specialAttack || 15,
        specialDefence: ivs.specialDefence || 15,
        speed: ivs.speed || 15,
      };
      this.stats.base = {
        hp: data.base_stats.hp,
        attack: data.base_stats.attack,
        defence: data.base_stats.defence,
        specialAttack: data.base_stats.specialAttack,
        specialDefence: data.base_stats.specialDefence,
        speed: data.base_stats.speed,
      };
      this.stats.final = calculatePokemonStats(
        this.stats.base,
        this.stats.ivs,
        level
      );
      this.moves = data.moves;
      return this;
    } catch (error) {
      throw new Error(`failed to initialize pokemon ${error.message}`);
    }
  }

  static async create(name, level, ivs) {
    const pokemon = new Pokemon();
    await pokemon.initialize(name, level, ivs);
    return pokemon;
  }
}

module.exports = Pokemon;
