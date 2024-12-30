const Pokemon = require("../../main/pokemon/pokemon.js");
const getPokemon = require("../../main/pokemon/utility/getPokemon.js");

jest.mock("../../main/pokemon/utility/getPokemon");

describe("pokemon class", () => {
  const mockPokemonData = {
    name: "charizard",
    number: 6,
    abilities: [{ name: "blaze" }, { name: "solar-power" }],
    types: ["fire", "flying"],
    base_stats: {
      hp: 78,
      attack: 84,
      defence: 78,
      specialAttack: 109,
      specialDefence: 85,
      speed: 100,
    },
    moves: [
      {
        tackle: {},
      },
      {
        flamethrower: {},
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    getPokemon.mockResolvedValue(mockPokemonData);
  });
  describe("constructor", () => {
    it("should initialize with default values", () => {
      const pokemon = new Pokemon();

      expect(pokemon.name).toBeNull();
      expect(pokemon.number).toBeNull();
      expect(pokemon.abilities).toBeNull();
      expect(pokemon.type1).toBeNull();
      expect(pokemon.type2).toBeNull();
      expect(pokemon.stats).toEqual({
        ivs: {},
        base: {},
        final: {},
      });
      expect(pokemon.moves).toEqual([]);
    });
  });

  describe("initialize", () => {
    it("should properly initialize a pokemon with default values", async () => {
      const pokemon = new Pokemon();
      await pokemon.initialize("charizard");

      expect(pokemon.name).toBe("charizard");
      expect(pokemon.number).toBe(6);
      expect(pokemon.abilities).toEqual([
        { name: "blaze" },
        { name: "solar-power" },
      ]);
      expect(pokemon.type1).toBe("fire");
      expect(pokemon.type2).toBe("flying");
      expect(pokemon.stats.ivs).toEqual({
        hp: 15,
        attack: 15,
        defence: 15,
        specialAttack: 15,
        specialDefence: 15,
        speed: 15,
      });
      expect(pokemon.moves).toEqual(mockPokemonData.moves);
    });

    it("should initialize with custom IVs", async () => {
      const customIVs = {
        hp: 31,
        attack: 31,
        defence: 31,
        specialAttack: 31,
        specialDefence: 31,
        speed: 31,
      };

      const pokemon = new Pokemon();
      await pokemon.initialize("charizard", 50, customIVs);

      expect(pokemon.stats.ivs).toEqual(customIVs);
    });
    it("should handle API errors gracefully", async () => {
      getPokemon.mockRejectedValue(new Error("API Error"));

      const pokemon = new Pokemon();
      await expect(pokemon.initialize("invalid")).rejects.toThrow(
        "failed to initialize pokemon"
      );
    });

    it("should calculate final stats correctly", async () => {
      const pokemon = new Pokemon();
      await pokemon.initialize("charizard", 50);

      expect(pokemon.stats.final).toBeDefined();
      expect(typeof pokemon.stats.final.hp).toBe("number");
      expect(typeof pokemon.stats.final.attack).toBe("number");
      expect(typeof pokemon.stats.final.defence).toBe("number");
      expect(typeof pokemon.stats.final.specialAttack).toBe("number");
      expect(typeof pokemon.stats.final.specialDefence).toBe("number");
      expect(typeof pokemon.stats.final.speed).toBe("number");
    });
  });

  it("should handle API errors gracefully", async () => {
    getPokemon.mockRejectedValue(new Error("API Error"));

    const pokemon = new Pokemon();
    await expect(pokemon.initialize("invalid")).rejects.toThrow(
      "failed to initialize pokemon"
    );
  });

  it("should calculate final stats correctly", async () => {
    const pokemon = new Pokemon();
    await pokemon.initialize("charizard", 50);

    expect(pokemon.stats.final).toBeDefined();
    expect(typeof pokemon.stats.final.hp).toBe("number");
    expect(typeof pokemon.stats.final.attack).toBe("number");
    expect(typeof pokemon.stats.final.defence).toBe("number");
    expect(typeof pokemon.stats.final.specialAttack).toBe("number");
    expect(typeof pokemon.stats.final.specialDefence).toBe("number");
    expect(typeof pokemon.stats.final.speed).toBe("number");
  });
});
