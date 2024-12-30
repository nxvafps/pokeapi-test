const axios = require("axios");

const getMove = async (move) => {
  move = move.toLowerCase();
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/move/${move}`);
    return {
      [response.data.name]: {
        details: {
          type: response.data.type.name,
          damage_class: response.data.damage_class.name,
          category: response.data.meta?.category.name || null,
          target: response.data.target.name,
        },
        stats: {
          power: response.data.power,
          accuracy: response.data.accuracy,
          pp: response.data.pp,
          priority: response.data.priority,
        },
        effects: {
          effect: response.data.meta?.ailment.name || null,
          effect_chance: response.data.meta?.ailment_chance || null,
          crit_rate: response.data.meta?.crit_rate || null,
          flinch_chance: response.data.meta?.flinch_chance || null,
          drain: response.data.meta?.drain || null,
          healing: response.data.meta?.healing || null,
          stat_changes: response.data.stat_changes.map((stat) => ({
            name: stat.stat.name,
            value: stat.change,
          })),
        },
      },
    };
  } catch (error) {
    console.error(`error fetching data: ${error}`);
    return null;
  }
};

module.exports = getMove;
