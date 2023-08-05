/**
 * Represents a coin bar object that displays the percentage of collected coins.
 * @extends DrawableObject
 */
 class CoinBar extends DrawableObject {
    /**
     * Array of image paths representing different states of the coin bar.
     * @type {string[]}
     */
    IMAGES = [
      'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
    ];
  
    /**
     * The current percentage value of collected coins.
     * @type {number}
     */
    percentage = 0;
  
    /**
     * Constructs a new CoinBar object.
     */
    constructor() {
      super();
      this.loadImages(this.IMAGES);
      this.x = 20;
      this.y = 110;
      this.width = 200;
      this.height = 60;
      this.setPercentage(0);
    }
  
    /**
     * Sets the percentage value of collected coins and updates the image accordingly.
     * @param {number} percentage - The percentage value of collected coins (0 to 100).
     */
    setPercentage(percentage) {
      this.percentage = percentage;
      let path = this.IMAGES[this.resolveImageIndex()];
      this.img = this.imageCache[path];
    }
  
    /**
     * Resolves the index of the image based on the current percentage value.
     * @returns {number} The index of the image in the IMAGES array.
     */
    resolveImageIndex() {
      if (this.percentage === 100) {
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
  