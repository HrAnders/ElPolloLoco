/**
 * Represents a boss health bar that can be drawn on the canvas.
 */
 class BossBar extends DrawableObject {
    /**
     * Array of image paths representing the different states of the boss health bar.
     * @type {string[]}
     */
    IMAGES = [
      'img/7_statusbars/2_statusbar_endboss/bossbar-health-0.png',
      'img/7_statusbars/2_statusbar_endboss/bossbar-health-20.png',
      'img/7_statusbars/2_statusbar_endboss/bossbar-health-40.png',
      'img/7_statusbars/2_statusbar_endboss/bossbar-health-60.png',
      'img/7_statusbars/2_statusbar_endboss/bossbar-health-80.png',
      'img/7_statusbars/2_statusbar_endboss/bossbar-health-100.png',
    ];
  
    /**
     * The current percentage value of the boss health bar.
     * @type {number}
     */
    percentage = 100;
  
    /**
     * Creates a new instance of BossBar.
     * Initializes the boss health bar with default values and loads the images.
     */
    constructor() {
      super();
      this.loadImages(this.IMAGES);
      this.x = 510;
      this.y = 0;
      this.width = 200;
      this.height = 60;
      this.setPercentage(100);
    }
  
    /**
     * Sets the percentage value of the boss health bar and updates the displayed image accordingly.
     * @param {number} percentage - The new percentage value (0 to 100).
     */
    setPercentage(percentage) {
      this.percentage = percentage;
      let path = this.IMAGES[this.resolveImageIndex()];
      this.img = this.imageCache[path];
    }
  
    /**
     * Resolves the index of the current image based on the percentage value.
     * @returns {number} The index of the current image in the IMAGES array.
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
  