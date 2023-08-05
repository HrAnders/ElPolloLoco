/**
 * Represents a bottle object that can be drawn on the canvas.
 * @extends DrawableObject
 */
 class Bottle extends DrawableObject {
    /**
     * The height of the bottle.
     * @type {number}
     */
    height = 100;
  
    /**
     * The width of the bottle.
     * @type {number}
     */
    width = 100;
  
    /**
     * An array of image paths representing the different images of the bottle.
     * @type {string[]}
     */
    IMAGES_BOTTLE = [
      'img/6_salsa_bottle/1_salsa_bottle_on_ground.png'
    ];
  
    /**
     * Constructs a new Bottle object.
     */
    constructor() {
      super();
      this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
      this.loadImages(this.IMAGES_BOTTLE);
      this.x = 200 + Math.random() * 1800;
      this.y = 330;
    }
  }
  