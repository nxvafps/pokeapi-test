const getMove = require("../../../main/pokemon/utility/getMove");
const axios = require("axios");

jest.mock("axios");

describe("getMove", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return an object", () => {
    expect(typeof getMove("tackle")).toBe("object");
  });

  it("should convert move name to lowercase", async () => {
    const mockMoveData = {
      data: {
        name: "tackle",
        type: { name: "normal" },
        damage_class: { name: "physical" },
        meta: {},
        target: { name: "selected-pokemon" },
        power: 40,
        accuracy: 100,
        pp: 35,
        priority: 0,
        stat_changes: [],
      },
    };

    axios.get.mockResolvedValueOnce(mockMoveData);
    await getMove("TACKLE");

    expect(axios.get).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/move/tackle"
    );
  });

  it("should handle API errors", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error");
    axios.get.mockRejectedValueOnce(new Error("API Error"));

    const result = await getMove("nonexistentmove");

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(result).toBeNull();

    consoleErrorSpy.mockRestore();
  });

  it("should fetch move data successfully", async () => {
    const mockMoveData = {
      data: {
        name: "tackle",
        type: { name: "normal" },
        damage_class: { name: "physical" },
        meta: {
          category: { name: "damage" },
          ailment: { name: "none" },
          ailment_chance: 0,
          crit_rate: 0,
          flinch_chance: 0,
          drain: 0,
          healing: 0,
        },
        target: { name: "selected-pokemon" },
        power: 40,
        accuracy: 100,
        pp: 35,
        priority: 0,
        stat_changes: [],
      },
    };

    axios.get.mockResolvedValueOnce(mockMoveData);

    const result = await getMove("tackle");
    expect(axios.get).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/move/tackle"
    );
    expect(result).toEqual({
      tackle: {
        details: {
          type: "normal",
          damage_class: "physical",
          category: "damage",
          target: "selected-pokemon",
        },
        stats: {
          power: 40,
          accuracy: 100,
          pp: 35,
          priority: 0,
        },
        effects: {
          effect: "none",
          effect_chance: null,
          crit_rate: null,
          flinch_chance: null,
          drain: null,
          healing: null,
          stat_changes: [],
        },
      },
    });
  });

  it("should handle moves with stat changes", async () => {
    const mockMoveData = {
      data: {
        name: "growl",
        type: { name: "normal" },
        damage_class: { name: "status" },
        meta: {
          category: { name: "net-good-stats" },
          ailment: { name: "none" },
          ailment_chance: 0,
        },
        target: { name: "all-opponents" },
        power: null,
        accuracy: 100,
        pp: 40,
        priority: 0,
        stat_changes: [
          {
            stat: { name: "attack" },
            change: -1,
          },
        ],
      },
    };

    axios.get.mockResolvedValueOnce(mockMoveData);
    const result = await getMove("growl");
    expect(result.growl.effects.stat_changes).toEqual([
      {
        name: "attack",
        value: -1,
      },
    ]);
  });
});
