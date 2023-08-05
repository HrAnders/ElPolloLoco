/**
 * Represents a cloud object that can move on the canvas.
 * @extends MovableObject
 */
 class Cloud extends MovableObject {
  /**
   * The y-coordinate of the cloud's position.
   * @type {number}
   */
  y = 20;

  /**
   * The width of the cloud.
   * @type {number}
   */
  width = 500;

  /**
   * The height of the cloud.
   * @type {number}
   */
  height = 250;

  /**
   * Constructs a new Cloud object.
   */
  constructor() {
    super().loadImage('img/5_background/layers/4_clouds/1.png');

    this.x = Math.random() * 500; // Number between 200 and 700
    this.animate();
  }

  /**
   * Animates the cloud's movement.
   */
  animate() {
    this.moveLeft();
  }

  /**
   * Moves the cloud to the left at a specific speed.
   */
  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }
}
