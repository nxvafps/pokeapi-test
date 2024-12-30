const inquirer = require("inquirer");
const inquirerAutocomplete = require("inquirer-autocomplete-prompt");
const { createTeam } = require("./team/createTeam");

inquirer.registerPrompt("autocomplete", inquirerAutocomplete);

async function main() {
  try {
    const team = await createTeam();
    console.log("Created team:", team);
  } catch (error) {
    console.error("Error creating team:", error);
  }
}

main();
