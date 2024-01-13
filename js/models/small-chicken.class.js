/**
 * Represents a small chicken enemy that extends the MovableObject class.
 */
class SmallChicken extends MovableObject {
  y = 370;
  height = 50;
  width = 60;
  smallChicken = true;

  /**
   * The array of image paths for the walking animation of the small chicken.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  offset = {
    top: 5,
    left: 5,
    right: 5,
    bottom: 5,
  };

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);

    this.x = 300 + Math.random() * 2000; //Number between 300 and 2300
    this.speed = 0.15 + Math.random() * 0.7;

    this.animate();
  }

  /**
   * Starts the animation of the small chicken.
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 90);
    this.animateDead();
  }

  /**
   * Animates the small chicken's death or walking depending on its energy level.
   */
  animateDead() {
    setInterval(() => {
      if (this.energy == 10) {
        this.loadImage("img/3_enemies_chicken/chicken_small/2_dead/dead.png");
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 1000 / 10);
  }
}
