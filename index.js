const inquirer = require("inquirer");
const Pokemon = require("./main/pokemon/pokemon");

const questions = [
  {
    type: "input",
    name: "pokemonName",
    message: "Enter a pokemon name: ",
  },
  {
    type: "number",
    name: "level",
    message: "Enter pokemon level (1-100): ",
    validate: (input) => {
      if (input >= 1 && input <= 100) return true;
      return "Please enter a level between 1 and 100";
    },
  },
  {
    type: "number",
    name: "hp",
    message: "Enter HP IV (0-31): ",
    default: 15,
    validate: (input) => {
      if (input >= 0 && input <= 31) return true;
      return "Please enter an IV between 0 and 31";
    },
  },
  {
    type: "number",
    name: "attack",
    message: "Enter Attack IV (0-31): ",
    default: 15,
    validate: (input) => {
      if (input >= 0 && input <= 31) return true;
      return "Please enter an IV between 0 and 31";
    },
  },
  {
    type: "number",
    name: "defense",
    message: "Enter Defense IV (0-31): ",
    default: 15,
    validate: (input) => {
      if (input >= 0 && input <= 31) return true;
      return "Please enter an IV between 0 and 31";
    },
  },
  {
    type: "number",
    name: "specialAttack",
    message: "Enter Special Attack IV (0-31): ",
    default: 15,
    validate: (input) => {
      if (input >= 0 && input <= 31) return true;
      return "Please enter an IV between 0 and 31";
    },
  },
  {
    type: "number",
    name: "specialDefense",
    message: "Enter Special Defense IV (0-31): ",
    default: 15,
    validate: (input) => {
      if (input >= 0 && input <= 31) return true;
      return "Please enter an IV between 0 and 31";
    },
  },
  {
    type: "number",
    name: "speed",
    message: "Enter Speed IV (0-31): ",
    default: 15,
    validate: (input) => {
      if (input >= 0 && input <= 31) return true;
      return "Please enter an IV between 0 and 31";
    },
  },
];

const askForPokemon = async () => {
  try {
    const answers = await inquirer.prompt(questions);
    const ivs = {
      hp: answers.hp,
      attack: answers.attack,
      defense: answers.defense,
      specialAttack: answers.specialAttack,
      specialDefense: answers.specialDefense,
      speed: answers.speed,
    };

    const pokemon = await Pokemon.create(
      answers.pokemonName,
      answers.level,
      ivs
    );
    console.log(pokemon);
    return pokemon;
  } catch (error) {
    console.error("Error creating pokemon:", error);
  }
};

askForPokemon();
