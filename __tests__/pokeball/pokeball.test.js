const Pokeball = require("../../main/pokeball/pokeball.js");
const Pokemon = require("../../main/pokemon/pokemon.js");
describe("pokeball class", () => {
  let pokeball, magikarp, bidoof, smeargle, consoleLogSpy;

  beforeEach(async () => {
    pokeball = new Pokeball();
    magikarp = await Pokemon.create("magikarp");
    bidoof = await Pokemon.create("bidoof");
    smeargle = await Pokemon.create("smeargle");
    consoleLogSpy = jest.spyOn(console, "log");
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  describe("init", () => {
    it("should initialise with empty pokemon storage", () => {
      expect(pokeball.storedPokemon).toBeNull();
    });
  });

  describe("isEmpty", () => {
    it("should return true when the pokemon storage is empty", () => {
      expect(pokeball.isEmpty()).toBe(true);
    });
    it("should return false when the pokeball is not empty", () => {
      pokeball.throw(bidoof);
      expect(pokeball.isEmpty()).toBe(false);
    });
  });

  describe("contains", () => {
    it("should console log empty... when the ball is empty", () => {
      expect(pokeball.contains()).toBe("empty...");
    });
    it("should return the name of the pokemon when the ball is not empty", () => {
      pokeball.throw(bidoof);
      expect(pokeball.contains()).toBe("bidoof");
    });
  });

  describe("throw", () => {
    describe("with argument", () => {
      it("should catch a pokemon if it is empty", () => {
        pokeball.throw(bidoof);
        expect(consoleLogSpy).toHaveBeenCalledWith("You caught bidoof!");
      });

      it("should not catch a pokemon if it is not empty", () => {
        pokeball.throw(bidoof);
        pokeball.throw(magikarp);
        expect(consoleLogSpy).toHaveBeenLastCalledWith(
          `This pokeball already contains bidoof!`
        );
        expect(pokeball.storedPokemon.name).toBe(`bidoof`);
      });
    });

    describe("without arguments", () => {
      it("should log that it is empty if it is empty", () => {
        pokeball.throw();
        expect(consoleLogSpy).toHaveBeenCalledWith("The pokeball is empty!");
      });

      it("should send out the pokemon if it is not empty", () => {
        pokeball.throw(bidoof);
        pokeball.throw();
        expect(consoleLogSpy).toHaveBeenLastCalledWith(
          `Go bidoof!! I choose you!`
        );
      });
    });
  });
});
