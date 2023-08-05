/**
 * Represents a drawable object that can be drawn on the canvas.
 */
 class DrawableObject {
    /**
     * The x-coordinate of the drawable object.
     * @type {number}
     */
    x = 120;
  
    /**
     * The y-coordinate of the drawable object.
     * @type {number}
     */
    y = 280;
  
    /**
     * The image object representing the drawable object.
     * @type {HTMLImageElement}
     */
    img;
  
    /**
     * The height of the drawable object.
     * @type {number}
     */
    height = 150;
  
    /**
     * The width of the drawable object.
     * @type {number}
     */
    width = 100;
  
    /**
     * Cache to store loaded image objects.
     * @type {Object.<string, HTMLImageElement>}
     */
    imageCache = {};
  
    /**
     * The index of the current image in the cache.
     * @type {number}
     */
    currentImage = 0;
  
    /**
     * Loads an image from the given path and assigns it to the `img` property.
     * @param {string} path - The path of the image to be loaded.
     */
    loadImage(path) {
      this.img = new Image();
      this.img.src = path;
    }
  
    /**
     * Draws the drawable object on the canvas using the provided 2D context.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    draw(ctx) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  
    /**
     * Draws a frame (rectangle) around the drawable object.
     * Only used for the Character and Chicken objects.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    drawFrame(ctx) {
      if (this instanceof Character || this instanceof Chicken) {
        ctx.beginPath();
        ctx.lineWidth = '3';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
      }
    }
  
    /**
     * Loads multiple images from an array of image paths and stores them in the image cache.
     * @param {string[]} arr - An array of image paths ['img/image1.png', 'img/image2.png', ...]
     */
    loadImages(arr) {
      arr.forEach((path) => {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
      });
    }
  }
  