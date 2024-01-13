/**
 * Represents a status bar for health that extends the DrawableObject class.
 */
class StatusBarHealth extends DrawableObject {
  /**
   * The array of image paths for the health status bar.
   * @type {string[]}
   */
  IMAGES = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png",
  ];

  /**
   * The current percentage value of the health status bar.
   * @type {number}
   */
  percentage = 100;

  constructor() {
    super();
    this.loadImage(
      "img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png"
    );
    this.loadImages(this.IMAGES);
    this.x = 10;
    this.y = 0;
    this.width = 170;
    this.height = 50;
    this.setPercentage(100);
  }

  /**
   * Sets the percentage value of the health status bar and updates the displayed image accordingly.
   * @param {number} percentage - The percentage value of the health status bar.
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
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
