/**
 * Represents a throwable object that extends the MovableObject class.
 */
class ThrowableObject extends MovableObject {
  /**
   * The array of image paths for bottle rotation.
   * @type {string[]}
   */
  BOTTLE_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  /**
   * The array of image paths for bottle splash.
   * @type {string[]}
   */
  BOTTLE_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Indicates if the bottle has been hit.
   * @type {boolean}
   */
  bottleHit = false;

  /**
   * Indicates if the bottle throw has started.
   * @type {boolean}
   */
  startThrow = false;

  /**
   * Indicates if the bottle throw has stopped.
   * @type {boolean}
   */
  stopThrow = false;

  /**
   * Indicates the direction of the bottle throw.
   * @type {boolean}
   */
  otherDirection = false;

  /**
   * The offset values for the throwable object.
   * @type {object}
   */
  offset = {
    top: 10,
    left: 20,
    right: 20,
    bottom: 5
  };

  /**
   * Constructs a new ThrowableObject instance.
   * @param {number} x - The x-coordinate of the object's position.
   * @param {number} y - The y-coordinate of the object's position.
   */
  constructor(x, y) {
    super().loadImage(
      "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.loadImages(this.BOTTLE_ROTATION);
    this.loadImages(this.BOTTLE_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 80;
    this.width = 70;
    this.animateRotation();
    this.animateBottleHit();
  }

  /**
   * Sets the speedY of the throwable object (bottle) to 25 and applies gravity.
   */
  throw() {
    if (this.otherDirection == false) {
      this.speedY = 25;
      this.applyGravity();

      setInterval(() => {
        this.x += 7;
      }, 25);
    }
  }

  /**
   * Works similar to the throw() function, but throws the bottle in the other direction.
   */
  throwOtherDirection() {
    if (this.otherDirection) {
      this.speedY = 25;
      this.applyGravity();

      setInterval(() => {
        this.x -= 7;
      }, 25);
    }
  }

  /**
   * Plays the animation for bottle rotation.
   */
  animateRotation() {
    setInterval(() => {
      if (this.startThrow) {
        this.playAnimation(this.BOTTLE_ROTATION);
      }
    }, 1000 / 20);
  }

  /**
   * Plays the animation for bottle splash.
   */
  animateBottleHit() {
    setInterval(() => {
      if (this.bottleHit) {
        this.playAnimation(this.BOTTLE_SPLASH);
      }
    }, 1000 / 500);
  }
}
