const axios = require("axios");
const {
  getPokemonNames,
  searchPokemon,
  pokemonList,
} = require("../../../main/team/utility/searchPokemon");

jest.mock("axios");

describe("Pokemon Search Functions", () => {
  const mockPokemonList = {
    data: {
      results: [
        { name: "bulbasaur" },
        { name: "ivysaur" },
        { name: "venusaur" },
        { name: "charmander" },
        { name: "charmeleon" },
      ],
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getPokemonNames", () => {
    it("should fetch pokemon names successfully", async () => {
      axios.get.mockResolvedValueOnce(mockPokemonList);

      const result = await getPokemonNames();

      expect(axios.get).toHaveBeenCalledWith(
        "https://pokeapi.co/api/v2/pokemon/?limit=1025"
      );
      expect(result).toEqual([
        "bulbasaur",
        "ivysaur",
        "venusaur",
        "charmander",
        "charmeleon",
      ]);
    });

    it("should handle API errors gracefully", async () => {
      const consoleErrorSpy = jest.spyOn(console, "error");
      axios.get.mockRejectedValueOnce(new Error("API Error"));

      const result = await getPokemonNames();

      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(result).toEqual([]);

      consoleErrorSpy.mockRestore();
    });
  });

  describe("searchPokemon", () => {
    beforeEach(async () => {
      axios.get.mockResolvedValueOnce(mockPokemonList);
      await getPokemonNames();
    });

    it("should return all pokemon when no input is provided", async () => {
      const result = await searchPokemon({}, "");
      expect(result).toEqual([
        "bulbasaur",
        "ivysaur",
        "venusaur",
        "charmander",
        "charmeleon",
      ]);
    });

    it("should return matching pokemon for partial input", async () => {
      const result = await searchPokemon({}, "char");
      expect(result).toEqual(["charmander", "charmeleon"]);
    });

    it("should handle case-insensitive search", async () => {
      const result = await searchPokemon({}, "CHAR");
      expect(result).toEqual(["charmander", "charmeleon"]);
    });

    it("should return empty array for non-matching input", async () => {
      const result = await searchPokemon({}, "xyz");
      expect(result).toEqual([]);
    });
  });
});
