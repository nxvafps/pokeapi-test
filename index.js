const axios = require("axios");

const getMove = async (move) => {
  move = move.toLowerCase();
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/move/${move}`);
    const statChanges = response.data.stat_changes.map((stat) => ({
      name: stat.stat.name,
      value: stat.change,
    }));
    return {
      name: response.data.name,
      type: response.data.type.name,
      damage_class: response.data.damage_class.name,
      category: response.data.meta.category.name,
      target: response.data.target.name,
      power: response.data.power,
      accuracy: response.data.accuracy,
      pp: response.data.pp,
      priority: response.data.priority,
      effect: response.data.meta.ailment.name,
      effect_chance: response.data.meta.ailment_chance,
      crit_rate: response.data.meta.crit_rate,
      flinch_chance: response.data.meta.flinch_chance,
      drain: response.data.meta.drain,
      healing: response.data.meta.healing,
      stat_changes: statChanges,
    };
  } catch (error) {
    console.error(`error fetching data: ${error}`);
    return null;
  }
};

const getPokemon = async (pokemon) => {
  pokemon = pokemon.toLowerCase();
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );
    const moves = await Promise.all(
      response.data.moves.map(async (move) => await getMove(move.move.name))
    );
    const abilities = response.data.abilities.map((ability) => ({
      name: ability.ability.name,
    }));
    return (pokemonData = {
      name: response.data.name,
      number: response.data.id,
      abilities: abilities,
      types: {
        1: response.data.types[0].type.name,
        2: response.data.types[1].type.name,
      },
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

// (async () => {
//   const garchomp = await getPokemon("garchomp");
//   console.log(garchomp.moves[42]);
// })();
(async () => {
  // const fakeOut = await getMove("fake-out");
  // const gigaDrain = await getMove("giga-drain");
  // const ancientPower = await getMove("ancient-power");
  const gible = await getPokemon("gible");
  console.log(gible);
  // console.log(fakeOut);
  // console.log(gigaDrain);
  // console.log(ancientPower);
})();
