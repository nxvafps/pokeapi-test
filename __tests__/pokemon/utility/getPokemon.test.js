const getPokemon = require("../../../main/pokemon/utility/getPokemon");
const axios = require("axios");

jest.mock("axios");

describe("getPokemon", () => {
  const mockPokemonData = {
    data: {
      name: "magikarp",
      id: 129,
      abilities: [
        { ability: { name: "swift-swim" } },
        { ability: { name: "rattled" } },
      ],
      types: [{ type: { name: "water" } }],
      stats: [
        { base_stat: 20 }, // hp
        { base_stat: 10 }, // attack
        { base_stat: 55 }, // defence
        { base_stat: 15 }, // special-attack
        { base_stat: 20 }, // special-defence
        { base_stat: 80 }, // speed
      ],
      moves: [
        { move: { name: "tackle" } },
        { move: { name: "hydro-pump" } },
        { move: { name: "splash" } },
        { move: { name: "flail" } },
        { move: { name: "bounce" } },
      ],
    },
  };

  const mockMoveData = {
    data: {
      name: "splash",
      type: { name: "normal" },
      damage_class: { name: "status" },
      meta: { category: { name: "no-damage" } },
      target: { name: "user" },
      power: null,
      accuracy: null,
      pp: 40,
      priority: 0,
      stat_changes: [],
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return an object", () => {
    expect(typeof getPokemon("magikarp")).toBe("object");
  });

  it("should convert pokemon name to lowercase", async () => {
    axios.get
      .mockResolvedValueOnce(mockPokemonData)
      .mockResolvedValue(mockMoveData);

    await getPokemon("MAGIKARP");

    expect(axios.get).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon/magikarp"
    );
  });

  it("should handle API errors gracefully", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error");
    axios.get.mockRejectedValueOnce(new Error("API Error"));

    const result = await getPokemon("nonexistent");

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(result).toBeUndefined();

    consoleErrorSpy.mockRestore();
  });

  it("should fetch pokemon data successfully", async () => {
    axios.get
      .mockResolvedValueOnce(mockPokemonData)
      .mockResolvedValue(mockMoveData); // For subsequent move requests

    const result = await getPokemon("magikarp");

    expect(axios.get).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon/magikarp"
    );
    expect(result).toMatchObject({
      name: "magikarp",
      number: 129,
      abilities: [{ name: "swift-swim" }, { name: "rattled" }],
      types: ["water"],
      base_stats: {
        hp: 20,
        attack: 10,
        defence: 55,
        specialAttack: 15,
        specialDefence: 20,
        speed: 80,
      },
    });
  });

  it("should fetch moves for the pokemon", async () => {
    axios.get
      .mockResolvedValueOnce(mockPokemonData)
      .mockResolvedValue(mockMoveData);

    const result = await getPokemon("magikarp");

    expect(result.moves).toHaveLength(5);
    expect(axios.get).toHaveBeenCalledTimes(6); // Once for pokemon, twice for moves
  });
});
