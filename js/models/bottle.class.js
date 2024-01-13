/**
 * Represents a bottle object that extends the CollectableObject class.
 */
class Bottle extends CollectableObject {
  /**
   * The selector for determining the bottle's appearance.
   * @type {number}
   */
  selector = Math.random() * 2;

  /**
   * Constructs a new Bottle object.
   */
  constructor() {
    super();

    /**
     * Loads the image for the bottle based on the selector value.
     */
    if (this.selector < 1) {
      this.loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    } else {
      this.loadImage("img/6_salsa_bottle/2_salsa_bottle_on_ground.png");
    }

    /**
     * The height of the bottle.
     * @type {number}
     */
    this.height = 80;

    /**
     * The width of the bottle.
     * @type {number}
     */
    this.width = 70;

    /**
     * The y-coordinate of the bottle.
     * @type {number}
     */
    this.y = 345;
  }
}

/**
 * Represents a bottle object in the air that extends the CollectableObject class.
 */
class BottleAir extends CollectableObject {
  /**
   * Constructs a new BottleAir object.
   */
  constructor() {
    super();

    /**
     * Loads the image for the bottle in the air.
     */
    this.loadImage("img/6_salsa_bottle/salsa_bottle.png");

    /**
     * The height of the bottle.
     * @type {number}
     */
    this.height = 80;

    /**
     * The width of the bottle.
     * @type {number}
     */
    this.width = 70;

    /**
     * The y-coordinate of the bottle.
     * @type {number}
     */
    this.y = 145;
  }
}
