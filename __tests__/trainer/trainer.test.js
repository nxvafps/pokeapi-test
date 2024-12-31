const Trainer = require("../../main/trainer/trainer.js");
const Pokemon = require("../../main/pokemon/pokemon.js");

describe("trainer class", () => {
  let consoleLogSpy, consoleErrorSpy, trainer, pokemon;

  beforeEach(async () => {
    consoleLogSpy = jest.spyOn(console, "log");
    consoleErrorSpy = jest.spyOn(console, "error");
    trainer = new Trainer("Ash");
    pokemon = await Pokemon.create("pikachu", 50);
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  describe("initialization", () => {
    it("should initialize with a valid name", () => {
      expect(trainer.name).toBe("Ash");
    });

    it("should not initialize with an invalid name", () => {
      expect(() => new Trainer()).toThrow("Trainer must have a valid name");
      expect(() => new Trainer(null)).toThrow("Trainer must have a valid name");
      expect(() => new Trainer(123)).toThrow("Trainer must have a valid name");
    });

    it("should initialize with 6 empty pokeballs", () => {
      expect(trainer.belt).toHaveLength(6);
      trainer.belt.forEach((pokeball) => {
        expect(pokeball.isEmpty()).toBe(true);
      });
    });
  });

  describe("catch method", () => {
    it("should successfully catch a pokemon in first empty pokeball", async () => {
      const success = trainer.catch(pokemon);
      expect(success).toBe(true);
      expect(trainer.belt[0].contains()).toBe("pikachu");
      expect(consoleLogSpy).toHaveBeenCalledWith("You caught pikachu!");
    });

    it("should fail to catch undefined pokemon", () => {
      expect(() => trainer.catch()).toThrow("Cannot catch undefined pokemon");
    });

    it("should fail when no empty pokeballs available", async () => {
      // Fill all pokeballs
      for (let i = 0; i < 6; i++) {
        const pokemon = await Pokemon.create("pikachu", 50);
        trainer.catch(pokemon);
      }

      const newPokemon = await Pokemon.create("charmander", 50);
      const success = trainer.catch(newPokemon);

      expect(success).toBe(false);
      expect(consoleLogSpy).toHaveBeenCalledWith(
        "No empty pokeballs available!"
      );
    });
  });

  describe("getPokemon method", () => {
    beforeEach(async () => {
      trainer.catch(pokemon);
    });

    it("should return null if no pokemon name provided", () => {
      expect(trainer.getPokemon()).toBeNull();
    });

    it("should return null if pokemon not found", () => {
      expect(trainer.getPokemon("charizard")).toBeNull();
    });

    it("should return pokemon if found", () => {
      const retrievedPokemon = trainer.getPokemon("pikachu");
      expect(retrievedPokemon).toBeDefined();
      expect(retrievedPokemon.name).toBe("pikachu");
      expect(consoleLogSpy).toHaveBeenCalledWith("Go pikachu!! I choose you!");
    });
  });
});
