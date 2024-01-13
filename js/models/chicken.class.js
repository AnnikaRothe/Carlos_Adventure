
/**
 * Represents a chicken enemy that moves across the screen.
 * @extends MovableObject
 */
class Chicken extends MovableObject {
  /** @type {number} The vertical position of the chicken. */
  y = 370;
  /** @type {number} The height of the chicken. */
  height = 70;
  /** @type {number} The width of the chicken. */
  width = 80;
  /** @type {boolean} Indicates if the chicken is small. */
  smallChicken = false;

  /** @type {string[]} An array of paths to walking animation images for the chicken. */
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  /** @type {object} The offset values for collision detection of the chicken. */
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  /**
   * Creates a new instance of the Chicken class.
   */
  constructor() {
    super();
    this.loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = 900 + Math.random() * 2000; // Number between 900 and 2800
    this.speed = 0.15 + Math.random() * 2;
    this.animate();
  }

  /**
   * Animates the movement of the chicken.
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 100);
    this.animateDead();
  }

  /**
   * Animates the chicken when it is dead or walking.
   */
  animateDead() {
    setInterval(() => {
      if (this.energy == 10) {
        this.loadImage("img/3_enemies_chicken/chicken_normal/2_dead/dead.png");
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);
  }
}
