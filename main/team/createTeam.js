const Pokemon = require("../pokemon/pokemon");
const { askForPokemon } = require("./utility/askForPokemon");

const createTeam = async () => {
  const team = await askForPokemon();
  const pokemonTeam = await Promise.all(
    team.map((pokemon) =>
      Pokemon.create(pokemon.name, pokemon.level, pokemon.ivs)
    )
  );
  return pokemonTeam;
};

module.exports = { createTeam };
