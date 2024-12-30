const axios = require("axios");
const getMove = require("./getMove.js");

const getPokemon = async (pokemon) => {
  pokemon = pokemon.toLowerCase();
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );
    const moves = await Promise.all(
      response.data.moves.map(async (move) => await getMove(move.move.name))
    );
    return (pokemonData = {
      name: response.data.name,
      number: response.data.id,
      abilities: response.data.abilities.map((ability) => ({
        name: ability.ability.name,
      })),
      types: response.data.types.map((type) => type.type.name),
      base_stats: {
        hp: response.data.stats[0].base_stat,
        attack: response.data.stats[1].base_stat,
        defence: response.data.stats[2].base_stat,
        specialAttack: response.data.stats[3].base_stat,
        specialDefence: response.data.stats[4].base_stat,
        speed: response.data.stats[5].base_stat,
      },
      moves: moves,
    });
  } catch (error) {
    console.error(`error fetching data: ${error}`);
  }
};

module.exports = getPokemon;
