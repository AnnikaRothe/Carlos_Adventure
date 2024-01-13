/**
 * Represents a cloud object that moves across the screen.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
  /** @type {number} The vertical position of the cloud. */
  y = 0;
  /** @type {number} The width of the cloud. */
  width = 550;
  /** @type {number} The height of the cloud. */
  height = 300;
  /** @type {number} The speed at which the cloud moves. */
  speed = 0.1;
  /** @type {number} A selector to determine the cloud's appearance. */
  selector = Math.random() * 2;

  /**
   * Creates a new instance of the Cloud class.
   * @constructor
   */
  constructor() {
    super();
    this.loadImage("img/5_background/layers/4_clouds/1.png");

    this.x = Math.random() * 500; // Number between 200 and 700
    this.animate();
  }

  /**
   * Animates the movement of the cloud.
   * @private
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 50);
  }
}
