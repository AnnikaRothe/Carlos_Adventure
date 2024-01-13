/**
 * Represents a level in the game.
 */
class Level {
  /**
   * Creates a new Level instance.
   * @param {Array} enemies - An array of enemies present in the level.
   * @param {Array} bottles - An array of bottles present in the level.
   * @param {Array} coins - An array of coins present in the level.
   * @param {Array} clouds - An array of clouds present in the level.
   * @param {Array} backgroundObjects - An array of background objects present in the level.
   */
  constructor(enemies, bottles, coins, clouds, backgroundObjects) {
    this.enemies = enemies;
    this.bottles = bottles;
    this.coins = coins;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.level_end_x = 2200;
  }
}
