const { searchPokemon } = require("./searchPokemon.js");

const questions = [
  {
    type: "autocomplete",
    name: "pokemonName",
    message: "Search for a pokemon: ",
    source: searchPokemon,
    pageSize: 10,
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
    type: "list",
    name: "ivPreset",
    message: "Choose IV preset:",
    choices: ["Max IVs (31)", "Min IVs (0)", "Custom IVs"],
  },
];

const ivQuestions = [
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

module.exports = { questions, ivQuestions };
