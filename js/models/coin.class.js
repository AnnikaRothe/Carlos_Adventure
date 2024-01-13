/**
 * Represents a coin that can be collected in the game.
 * @extends CollectableObject
 */
class Coin extends CollectableObject {
  /** @type {boolean} A flag to control the coin image switching animation. */
  coinVar = false;

  /**
   * Creates a new instance of the Coin class.
   * @constructor
   */
  constructor() {
    super();
    this.loadImage("img/8_coin/coin_2.png");
    this.height = 100;
    this.width = 100;
    this.y = 350;
    this.switchImg();
  }

  /**
   * Switches the coin's image between two states in an animation.
   * @private
   */
  switchImg() {
    let i;
    setInterval(() => {
      if (!this.coinVar) {
        i = 0;
      }
      if (i == 0) {
        this.loadImage("img/8_coin/coin_1.png");
        i++;
        this.coinVar = true;
      } else {
        this.loadImage("img/8_coin/coin_2.png");
        this.coinVar = false;
      }
    }, 500);
  }
}
