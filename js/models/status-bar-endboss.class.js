/**
 * Represents a status bar for the end boss that extends the DrawableObject class.
 */
class StatusBarEndboss extends DrawableObject {
  /**
   * The array of image paths for the end boss status bar.
   * @type {string[]}
   */
  IMAGES = [
    "img/7_statusbars/2_statusbar_endboss/green0.png",
    "img/7_statusbars/2_statusbar_endboss/green20.png",
    "img/7_statusbars/2_statusbar_endboss/green40.png",
    "img/7_statusbars/2_statusbar_endboss/green60.png",
    "img/7_statusbars/2_statusbar_endboss/green80.png",
    "img/7_statusbars/2_statusbar_endboss/green100.png",
  ];

  constructor() {
    super();
    this.loadImage("img/7_statusbars/2_statusbar_endboss/green100.png");
    this.loadImages(this.IMAGES);
    this.x = 540;
    this.y = 10;
    this.width = 170;
    this.height = 40;
    this.setPercentage(2);
  }

  /**
   * Sets the percentage value of the end boss status bar and updates the displayed image accordingly.
   * @param {number} percentage - The percentage value of the end boss status bar.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the index of the image to be displayed based on the current percentage value.
   * @returns {number} The index of the image in the IMAGES array.
   */
  resolveImageIndex() {
    if (this.percentage == 2) {
      return 5;
    } else if (this.percentage > 1.5) {
      return 4;
    } else if (this.percentage > 1) {
      return 3;
    } else if (this.percentage > 0.5) {
      return 2;
    } else if (this.percentage > 0) {
      return 1;
    } else {
      return 0;
    }
  }
}
