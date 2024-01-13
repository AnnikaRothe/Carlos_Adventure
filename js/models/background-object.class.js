/**
 * Represents a background object that extends the MovableObject class.
 */
class BackgroundObject extends MovableObject {
  /**
   * The width of the background object.
   * @type {number}
   */
  width = 720;

  /**
   * The height of the background object.
   * @type {number}
   */
  height = 480;

  /**
   * Constructs a new BackgroundObject.
   * @param {string} imagePath - The path to the image of the background object.
   * @param {number} x - The x-coordinate of the background object.
   */
  constructor(imagePath, x) {
    super();

    /**
     * Loads the image for the background object.
     */
    this.loadImage(imagePath);

    /**
     * The y-coordinate of the background object.
     * @type {number}
     */
    this.y = 480 - this.height;

    /**
     * The x-coordinate of the background object.
     * @type {number}
     */
    this.x = x;
  }

}
