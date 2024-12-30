const { createTeam } = require("../../main/team/createTeam");
const { askForPokemon } = require("../../main/team/utility/askForPokemon");
const Pokemon = require("../../main/pokemon/pokemon");

jest.mock("../../main/team/utility/askForPokemon");
jest.mock("../../main/pokemon/pokemon");

describe("createTeam", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a team with valid Pokemon data", async () => {
    const mockTeamData = [
      { name: "Pikachu", level: 5, ivs: { hp: 31, attack: 31 } },
      { name: "Charizard", level: 50, ivs: { hp: 25, attack: 28 } },
    ];

    askForPokemon.mockResolvedValue(mockTeamData);
    Pokemon.create.mockImplementation((name, level, ivs) =>
      Promise.resolve({ name, level, ivs })
    );

    const result = await createTeam();

    expect(askForPokemon).toHaveBeenCalledTimes(1);
    expect(Pokemon.create).toHaveBeenCalledTimes(2);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual(mockTeamData[0]);
    expect(result[1]).toEqual(mockTeamData[1]);
  });

  it("should handle empty team input", async () => {
    askForPokemon.mockResolvedValue([]);

    const result = await createTeam();

    expect(result).toHaveLength(0);
    expect(Pokemon.create).not.toHaveBeenCalled();
  });

  it("should handle Pokemon creation failure", async () => {
    const mockTeamData = [{ name: "Pikachu", level: 5, ivs: {} }];
    askForPokemon.mockResolvedValue(mockTeamData);
    Pokemon.create.mockRejectedValue(new Error("Failed to create Pokemon"));

    await expect(createTeam()).rejects.toThrow("Failed to create Pokemon");
  });

  it("should create maximum size team", async () => {
    const mockTeamData = Array(6).fill({ name: "Pikachu", level: 5, ivs: {} });
    askForPokemon.mockResolvedValue(mockTeamData);
    Pokemon.create.mockImplementation((name, level, ivs) =>
      Promise.resolve({ name, level, ivs })
    );

    const result = await createTeam();

    expect(result).toHaveLength(6);
    expect(Pokemon.create).toHaveBeenCalledTimes(6);
  });

  it("should handle askForPokemon rejection", async () => {
    askForPokemon.mockRejectedValue(new Error("User cancelled"));

    await expect(createTeam()).rejects.toThrow("User cancelled");
    expect(Pokemon.create).not.toHaveBeenCalled();
  });
});
