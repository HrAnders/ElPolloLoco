/**
 * Represents a movable object that can be drawn and animated on the canvas.
 * Extends the DrawableObject class.
 */
 class MovableObject extends DrawableObject {
    /**
     * The movement speed of the movable object.
     * @type {number}
     */
    speed = 0.15;
  
    /**
     * Flag indicating if the movable object is facing the other direction.
     * @type {boolean}
     */
    otherDirection = false;
  
    /**
     * The vertical speed of the movable object (for jumping).
     * @type {number}
     */
    speedY = 0;
  
    /**
     * The acceleration value for gravity.
     * @type {number}
     */
    acceleration = 2.5;
  
    /**
     * The energy level of the movable object.
     * @type {number}
     */
    energy = 100;
  
    /**
     * The timestamp of the last hit received by the movable object.
     * @type {number}
     */
    lastHit = 0;
  
    /**
     * The amount of bottles collected by the movable object.
     * @type {number}
     */
    bottleAmount = 0;
  
    /**
     * The amount of coins collected by the movable object.
     * @type {number}
     */
    coinAmount = 0;
  
    /**
     * Flag indicating if the movable object is currently jumping.
     * @type {boolean}
     */
    isJumping = false;
  
    /**
     * The interval ID for applying gravity to the movable object.
     * @type {number}
     */
    applyGravityInterval;
  
    /**
     * Applies gravity to the movable object, making it fall down when not on the ground.
     */
    applyGravity() {
      this.applyGravityInterval = setInterval(() => {
        if (this.isAboveGround() || this.speedY > 0) {
          this.y -= this.speedY;
          this.speedY -= this.acceleration;
        }
      }, 1000 / 25);
    }
  
    /**
     * Sets the image of the movable object.
     * @param {string} imagePath - The path to the image file.
     */
    setImage(imagePath) {
      this.image = new Image();
      this.image.src = imagePath;
    }
  
    /**
     * Checks if the movable object is above the ground.
     * @returns {boolean} True if the movable object is above the ground, false otherwise.
     */
    isAboveGround() {
      if (this instanceof throwableObjects) {
        return true;
      } else {
        return this.y < 155;
      }
    }
  
    /**
     * Checks if the movable object is colliding with another object.
     * @param {DrawableObject} mo - The other object to check collision with.
     * @returns {boolean} True if the movable object is colliding with the other object, false otherwise.
     */
    isColliding(mo) {
      return (
        this.x + this.width > mo.x &&
        this.y + this.height > mo.y &&
        this.x < mo.x &&
        this.y < mo.y + mo.height
      );
    }
  
    /**
     * Handles the hit received by the movable object.
     * Reduces the energy level and updates the last hit timestamp.
     */
    hit() {
      this.energy -= 5;
      if (this.energy < 0) {
        this.energy = 0;
      } else {
        this.lastHit = new Date().getTime();
      }
    }

    hitEndboss() {
      this.energy -= 100;
      if (this.energy < 0) {
        this.energy = 0;
      } else {
        this.lastHit = new Date().getTime();
      }
    }
  
    /**
     * Handles the hit received by the movable object from the end boss.
     * Reduces the energy level and updates the last hit timestamp.
     */
    hitEnboss() {
      this.energy -= 20;
      if (this.energy < 0) {
        this.energy = 0;
      } else {
        this.lastHit = new Date().getTime();
      }
    }
  
    /**
     * Handles the collection of bottles by the movable object.
     * Increases the bottle amount.
     */
    hitBottle() {
      this.bottleAmount += 10;
    }
  
    /**
     * Handles the throwing of bottles by the movable object.
     * Decreases the bottle amount.
     */
    throwBottle() {
      this.bottleAmount -= 10;
    }
  
    /**
     * Handles the collection of coins by the movable object.
     * Increases the coin amount.
     */
    hitCoins() {
      this.coinAmount += 10;
    }
  
    /**
     * Checks if the movable object is hurt.
     * @returns {boolean} True if the movable object is hurt, false otherwise.
     */
    isHurt() {
      let timepassed = new Date().getTime() - this.lastHit; // Difference in milliseconds
      timepassed = timepassed / 1000; // Convert to seconds
      return timepassed < 1;
    }
  
    /**
     * Checks if the movable object is dead (energy level is zero).
     * @returns {boolean} True if the movable object is dead, false otherwise.
     */
    isDead() {
      return this.energy == 0;
    }
  
    /**
     * Plays the animation of the movable object using the provided images.
     * @param {string[]} images - An array of image paths representing the animation frames.
     */
    playAnimation(images) {
      let i = this.currentImage % images.length;
      let path = images[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }
  
    /**
     * Moves the movable object to the right.
     */
    moveRight() {
      this.x += this.speed;
      this.otherDirection = false;
      this.walking_sound.play();
    }
  
    /**
     * Moves the movable object to the left.
     */
    moveLeft() {
      this.x -= this.speed;
    }
  
    /**
     * Makes the movable object jump.
     */
    jump() {
      this.speedY = 30;
    }
  }
  