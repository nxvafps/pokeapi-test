const axios = require("axios");
const fuzzy = require("fuzzy");

let pokemonList = [];

async function getPokemonNames() {
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/?limit=1025"
    );
    pokemonList = response.data.results.map((pokemon) => pokemon.name);
    return pokemonList;
  } catch (error) {
    console.error("Error fetching Pokemon names:", error.message);
    return [];
  }
}

function searchPokemon(answers, input = "") {
  return new Promise((resolve) => {
    const fuzzyResult = fuzzy.filter(input, pokemonList);
    resolve(fuzzyResult.map((entry) => entry.original));
  });
}

module.exports = { getPokemonNames, searchPokemon, pokemonList };
