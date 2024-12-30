function calculateStat(base, iv, level, isHP = false) {
  if (isHP) {
    return Math.floor(0.01 * ((2 * base + iv) * level) + level + 10);
  }
  return Math.floor(0.01 * (2 * base + iv) * level) + 5;
}

function calculatePokemonStats(baseStats, ivs, level) {
  return {
    hp: calculateStat(baseStats.hp, ivs.hp, level, true),
    attack: calculateStat(baseStats.attack, ivs.attack, level),
    defence: calculateStat(baseStats.defence, ivs.defence, level),
    specialAttack: calculateStat(
      baseStats.specialAttack,
      ivs.specialAttack,
      level
    ),
    specialDefence: calculateStat(
      baseStats.specialDefence,
      ivs.specialDefence,
      level
    ),
    speed: calculateStat(baseStats.speed, ivs.speed, level),
  };
}

module.exports = { calculateStat, calculatePokemonStats };
