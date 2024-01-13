/**
 * Represents a status bar for bottles that extends the DrawableObject class.
 */
class StatusBarBottles extends DrawableObject {
  /**
   * The array of image paths for the bottle status bar.
   * @type {string[]}
   */
  IMAGES = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png"
  ];

  bottleAmount = 0;

  constructor() {
    super();
    this.loadImage(
      "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png"
    );
    this.loadImages(this.IMAGES);
    this.x = 10;
    this.y = 40;
    this.width = 170;
    this.height = 50;
    this.setBottleAmount(0);
  }

  /**
   * Sets the number of bottles and updates the displayed image accordingly.
   * @param {number} bottleAmount - The number of bottles.
   */
  setBottleAmount(bottleAmount) {
    this.bottleAmount = bottleAmount;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the index of the image to be displayed based on the current number of bottles.
   * @returns {number} The index of the image in the IMAGES array.
   */
  resolveImageIndex() {
    if (this.bottleAmount == 10) {
      return 5;
    } else if (this.bottleAmount > 8) {
      return 4;
    } else if (this.bottleAmount > 6) {
      return 3;
    } else if (this.bottleAmount > 4) {
      return 2;
    } else if (this.bottleAmount >= 2) {
      return 1;
    } else {
      return 0;
    }
  }
}
