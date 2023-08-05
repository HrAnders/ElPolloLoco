/**
 * Represents a coin object that can be collected by the character.
 * @extends DrawableObject
 */
 class Coins extends DrawableObject {
    /**
     * The height of the coin object.
     * @type {number}
     */
    height = 110;
  
    /**
     * The width of the coin object.
     * @type {number}
     */
    width = 110;
  
    /**
     * Array of image paths representing the coin object.
     * @type {string[]}
     */
    IMAGES_COINS = [
      'img/8_coin/coin_1.png'
    ];
  
    /**
     * Constructs a new Coins object.
     */
    constructor() {
      super().loadImage('img/8_coin/coin_1.png');
      this.loadImages(this.IMAGES_COINS);
      this.x = 200 + Math.random() * 1800;
      this.y = 300;
    }
  }
  