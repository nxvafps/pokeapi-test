const inquirer = require("inquirer");
const getPokemon = require("./main/getPokemon");

const question = [
  {
    type: "input",
    name: "pokemonName",
    message: "Enter a pokemon name: ",
  },
];

const askForPokemon = async () => {
  const answer = await inquirer.prompt(question);
  const pokemon = await getPokemon(answer.pokemonName);
  console.log(pokemon);
  return pokemon;
};

askForPokemon();
