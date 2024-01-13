/**
 * The level instance for the game.
 * @type {Level}
 */
let level1;

/**
 * Initializes the level by creating and populating the level1 object.
 */
function initLevel() {
  level1 = new Level(
    // Array of chicken objects
    [
      new SmallChicken(),
      new SmallChicken(),
      new Chicken(),
      new SmallChicken(),
      new Chicken(),
      new Chicken(),
      new SmallChicken(),
      new SmallChicken(),
      new Chicken(),
      new Chicken(),
      new SmallChicken(),
      new SmallChicken(),
      new Chicken(),
      new Chicken()
    ],
    // Array of bottle objects
    [
      new Bottle(),
      new Bottle(),
      new BottleAir(),
      new BottleAir(),
      new BottleAir(),
      new Bottle(),
      new BottleAir(),
      new BottleAir(),
      new Bottle(),
      new Bottle()
    ],
    // Array of coin objects
    [
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin()
    ],
    // Array of cloud objects
    [
      new Cloud(),
      new Cloud(),
      new Cloud()
    ],
    // Array of background objects
    [
      new BackgroundObject('img/5_background/layers/air.png', -719),
      new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
      new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
      new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

      new BackgroundObject('img/5_background/layers/air.png', 0),
      new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
      new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
      new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
      new BackgroundObject('img/5_background/layers/air.png', 719),
      new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
      new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
      new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

      new BackgroundObject('img/5_background/layers/air.png', 719*2),
      new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*2),
      new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*2),
      new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*2),
      new BackgroundObject('img/5_background/layers/air.png', 719*3),
      new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*3),
      new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*3),
      new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*3)
    ]
  );
}
