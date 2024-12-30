const inquirer = require("inquirer");
const { askForPokemon } = require("../../../main/team/utility/askForPokemon");
const { getPokemonNames } = require("../../../main/team/utility/searchPokemon");

jest.mock("inquirer");
jest.mock("../../../main/team/utility/searchPokemon");

describe("askForPokemon", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getPokemonNames.mockResolvedValue(["bulbasaur", "charmander", "squirtle"]);
  });

  it("should create a team with max IVs", async () => {
    // Mock user input for all 6 Pokemon with max IVs
    inquirer.prompt.mockResolvedValueOnce({
      pokemonName: "bulbasaur",
      level: 50,
      ivPreset: "Max IVs (31)",
    });

    const expectedTeam = [
      {
        name: "bulbasaur",
        level: 50,
        ivs: {
          hp: 31,
          attack: 31,
          defense: 31,
          specialAttack: 31,
          specialDefense: 31,
          speed: 31,
        },
      },
    ];

    // Mock just one Pokemon for brevity, but you could test all 6
    inquirer.prompt
      .mockResolvedValueOnce({
        pokemonName: "bulbasaur",
        level: 50,
        ivPreset: "Max IVs (31)",
      })
      .mockResolvedValueOnce({
        pokemonName: "charmander",
        level: 50,
        ivPreset: "Max IVs (31)",
      })
      .mockResolvedValueOnce({
        pokemonName: "squirtle",
        level: 50,
        ivPreset: "Max IVs (31)",
      })
      .mockResolvedValueOnce({
        pokemonName: "pikachu",
        level: 50,
        ivPreset: "Max IVs (31)",
      })
      .mockResolvedValueOnce({
        pokemonName: "eevee",
        level: 50,
        ivPreset: "Max IVs (31)",
      })
      .mockResolvedValueOnce({
        pokemonName: "mewtwo",
        level: 50,
        ivPreset: "Max IVs (31)",
      });

    const result = await askForPokemon();
    expect(result.length).toBe(6);
    expect(result[0]).toEqual(expectedTeam[0]);
  });

  it("should create a team with custom IVs", async () => {
    const customIVs = {
      hp: 25,
      attack: 20,
      defense: 15,
      specialAttack: 30,
      specialDefense: 10,
      speed: 5,
    };

    inquirer.prompt.mockReset();

    inquirer.prompt
      .mockImplementationOnce(() =>
        Promise.resolve({
          pokemonName: "bulbasaur",
          level: 50,
          ivPreset: "Custom IVs",
        })
      )
      .mockImplementationOnce(() => Promise.resolve(customIVs))
      .mockImplementationOnce(() =>
        Promise.resolve({
          pokemonName: "charmander",
          level: 50,
          ivPreset: "Max IVs (31)",
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          pokemonName: "squirtle",
          level: 50,
          ivPreset: "Max IVs (31)",
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          pokemonName: "pikachu",
          level: 50,
          ivPreset: "Max IVs (31)",
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          pokemonName: "eevee",
          level: 50,
          ivPreset: "Max IVs (31)",
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          pokemonName: "mewtwo",
          level: 50,
          ivPreset: "Max IVs (31)",
        })
      );

    const expectedTeam = [
      {
        name: "bulbasaur",
        level: 50,
        ivs: customIVs,
      },
      {
        name: "charmander",
        level: 50,
        ivs: {
          hp: 31,
          attack: 31,
          defense: 31,
          specialAttack: 31,
          specialDefense: 31,
          speed: 31,
        },
      },
      {
        name: "squirtle",
        level: 50,
        ivs: {
          hp: 31,
          attack: 31,
          defense: 31,
          specialAttack: 31,
          specialDefense: 31,
          speed: 31,
        },
      },
      {
        name: "pikachu",
        level: 50,
        ivs: {
          hp: 31,
          attack: 31,
          defense: 31,
          specialAttack: 31,
          specialDefense: 31,
          speed: 31,
        },
      },
      {
        name: "eevee",
        level: 50,
        ivs: {
          hp: 31,
          attack: 31,
          defense: 31,
          specialAttack: 31,
          specialDefense: 31,
          speed: 31,
        },
      },
      {
        name: "mewtwo",
        level: 50,
        ivs: {
          hp: 31,
          attack: 31,
          defense: 31,
          specialAttack: 31,
          specialDefense: 31,
          speed: 31,
        },
      },
    ];

    const result = await askForPokemon();
    console.log(result);
    expect(result).toBeDefined();
    expect(result.length).toBe(6);
    expect(result).toEqual(expectedTeam);
  });

  it("should handle errors gracefully", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error");
    getPokemonNames.mockRejectedValue(new Error("API Error"));

    const result = await askForPokemon();

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(result).toEqual([]);

    consoleErrorSpy.mockRestore();
  });

  it("should validate level input", async () => {
    inquirer.prompt.mockResolvedValueOnce({
      pokemonName: "bulbasaur",
      level: 101, // Invalid level
      ivPreset: "Max IVs (31)",
    });

    const result = await askForPokemon();
    expect(inquirer.prompt.mock.calls[0][0][1].validate(101)).toBe(
      "Please enter a level between 1 and 100"
    );
    expect(inquirer.prompt.mock.calls[0][0][1].validate(50)).toBe(true);
  });
});
