/**
 * Represents a bottle bar that displays the status of a bottle.
 * @extends DrawableObject
 */
 class BottleBar extends DrawableObject {
    /**
     * An array of image paths representing the different states of the bottle bar.
     * @type {string[]}
     */
    IMAGES = [
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];
  
    /**
     * The current percentage of the bottle bar.
     * @type {number}
     */
    percentage = 0;
  
    /**
     * Constructs a new BottleBar object.
     */
    constructor() {
      super();
      this.loadImages(this.IMAGES);
      this.x = 20;
      this.y = 55;
      this.width = 200;
      this.height = 60;
      this.setPercentage(0);
    }
  
    /**
     * Sets the percentage of the bottle bar and updates the displayed image accordingly.
     * @param {number} percentage - The percentage value to set (0 to 100).
     */
    setPercentage(percentage) {
      this.percentage = percentage;
      let path = this.IMAGES[this.resolveImageIndex()];
      this.img = this.imageCache[path];
    }
  
    /**
     * Resolves the index of the image based on the current percentage.
     * @returns {number} - The index of the image in the IMAGES array.
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
  