const {
  calculateStat,
  calculatePokemonStats,
} = require("../../../main/pokemon/utility/calculatePokemonStats");

describe("calculateStat", () => {
  it("should return a number", () => {
    expect(typeof calculateStat(100, 31, 50, true)).toBe("number");
  });

  it("should return an integer", () => {
    const result = calculateStat(45, 15, 50, false);
    expect(Number.isInteger(result)).toBe(true);
  });

  it("should correctly calculate HP stat", () => {
    expect(calculateStat(100, 31, 50, true)).toBe(175);
    expect(calculateStat(50, 31, 50, true)).toBe(125);
    expect(calculateStat(20, 31, 50, true)).toBe(95);
    expect(calculateStat(100, 0, 50, true)).toBe(160);
  });

  it("should correctly calculate non-HP stats", () => {
    expect(calculateStat(100, 31, 50, false)).toBe(120);
    expect(calculateStat(50, 31, 50, false)).toBe(70);
    expect(calculateStat(20, 31, 50, false)).toBe(40);
    expect(calculateStat(100, 0, 50, false)).toBe(105);
  });

  it("should handle level 1 calculations", () => {
    expect(calculateStat(100, 31, 1, true)).toBe(13);
    expect(calculateStat(100, 31, 1, false)).toBe(7);
  });

  it("should handle level 100 calculations", () => {
    expect(calculateStat(100, 31, 100, true)).toBe(341);
    expect(calculateStat(100, 31, 100, false)).toBe(236);
  });
});

describe("calculatePokemonStats", () => {
  let highIvs, lowIvs, highBaseStats, lowBaseStats;
  beforeEach(() => {
    highIvs = {
      hp: 31,
      attack: 31,
      defence: 31,
      specialAttack: 31,
      specialDefence: 31,
      speed: 31,
    };

    lowIvs = {
      hp: 0,
      attack: 0,
      defence: 0,
      specialAttack: 0,
      specialDefence: 0,
      speed: 0,
    };

    highBaseStats = {
      hp: 100,
      attack: 100,
      defence: 100,
      specialAttack: 100,
      specialDefence: 100,
      speed: 100,
    };

    lowBaseStats = {
      hp: 20,
      attack: 20,
      defence: 20,
      specialAttack: 20,
      specialDefence: 20,
      speed: 20,
    };
  });

  it("should return an object with all stats", () => {
    const stats = calculatePokemonStats(highBaseStats, highIvs, 50);
    expect(stats).toHaveProperty("hp");
    expect(stats).toHaveProperty("attack");
    expect(stats).toHaveProperty("defence");
    expect(stats).toHaveProperty("specialAttack");
    expect(stats).toHaveProperty("specialDefence");
    expect(stats).toHaveProperty("speed");
  });

  it("should calculate stats correctly with high IVs and base stats at level 50", () => {
    const stats = calculatePokemonStats(highBaseStats, highIvs, 50);
    expect(stats.hp).toBe(175);
    expect(stats.attack).toBe(120);
    expect(stats.defence).toBe(120);
    expect(stats.specialAttack).toBe(120);
    expect(stats.specialDefence).toBe(120);
    expect(stats.speed).toBe(120);
  });

  it("should calculate stats correctly with low IVs and base stats at level 50", () => {
    const stats = calculatePokemonStats(lowBaseStats, lowIvs, 50);
    expect(stats.hp).toBe(80);
    expect(stats.attack).toBe(25);
    expect(stats.defence).toBe(25);
    expect(stats.specialAttack).toBe(25);
    expect(stats.specialDefence).toBe(25);
    expect(stats.speed).toBe(25);
  });

  it("should handle level 1 calculations", () => {
    const stats = calculatePokemonStats(highBaseStats, highIvs, 1);
    expect(stats.hp).toBe(13);
    expect(stats.attack).toBe(7);
    expect(stats.defence).toBe(7);
    expect(stats.specialAttack).toBe(7);
    expect(stats.specialDefence).toBe(7);
    expect(stats.speed).toBe(7);
  });

  it("should handle level 100 calculations", () => {
    const stats = calculatePokemonStats(highBaseStats, highIvs, 100);
    expect(stats.hp).toBe(341);
    expect(stats.attack).toBe(236);
    expect(stats.defence).toBe(236);
    expect(stats.specialAttack).toBe(236);
    expect(stats.specialDefence).toBe(236);
    expect(stats.speed).toBe(236);
  });
});
