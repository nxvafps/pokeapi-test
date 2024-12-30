const inquirer = require("inquirer");
const { questions, ivQuestions } = require("./prompts");
const { getPokemonNames } = require("./searchPokemon");

const askForPokemon = async () => {
  try {
    await getPokemonNames();
    const team = [];

    for (let i = 1; i <= 6; i++) {
      console.log(`\nSelecting Pokémon ${i} of 6`);
      const answers = await inquirer.prompt(questions);

      let ivs;
      if (answers.ivPreset === "Max IVs (31)") {
        ivs = {
          hp: 31,
          attack: 31,
          defense: 31,
          specialAttack: 31,
          specialDefense: 31,
          speed: 31,
        };
      } else if (answers.ivPreset === "Min IVs (0)") {
        ivs = {
          hp: 0,
          attack: 0,
          defense: 0,
          specialAttack: 0,
          specialDefense: 0,
          speed: 0,
        };
      } else {
        const ivAnswers = await inquirer.prompt(ivQuestions);
        ivs = {
          hp: ivAnswers.hp,
          attack: ivAnswers.attack,
          defense: ivAnswers.defense,
          specialAttack: ivAnswers.specialAttack,
          specialDefense: ivAnswers.specialDefense,
          speed: ivAnswers.speed,
        };
      }

      team.push({
        name: answers.pokemonName,
        level: answers.level,
        ivs: ivs,
      });
    }
    return team;
  } catch (error) {
    console.error("Error:", error.message);
    return [];
  }
};

module.exports = { askForPokemon };
