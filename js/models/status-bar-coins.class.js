
/**
 * Represents a status bar for coins that extends the DrawableObject class.
 */
class StatusBarCoins extends DrawableObject {
  /**
   * The array of image paths for the coin status bar.
   * @type {string[]}
   */
  IMAGES = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  coinsAmount = 0;

  constructor() {
    super();
    this.loadImage("img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png");
    this.loadImages(this.IMAGES);
    this.x = 10;
    this.y = 80;
    this.width = 170;
    this.height = 50;
    this.setCoinsAmount(0);
  }

  /**
   * Sets the number of coins and updates the displayed image accordingly.
   * @param {number} coinsAmount - The number of coins.
   */
  setCoinsAmount(coinsAmount) {
    this.coinsAmount = coinsAmount;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the index of the image to be displayed based on the current number of coins.
   * @returns {number} The index of the image in the IMAGES array.
   */
  resolveImageIndex() {
    if (this.coinsAmount == 8) {
      return 5;
    } else if (this.coinsAmount >= 6) {
      return 4;
    } else if (this.coinsAmount >= 4) {
      return 3;
    } else if (this.coinsAmount >= 2) {
      return 2;
    } else if (this.coinsAmount == 1) {
      return 1;
    } else {
      return 0;
    }
  }
}
