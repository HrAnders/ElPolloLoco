/**
 * Represents a chicken enemy that can move on the canvas.
 * @extends MovableObject
 */
 class Chicken extends MovableObject {
    /**
     * The y-coordinate of the chicken's position.
     * @type {number}
     */
    y = 340;
  
    /**
     * The width of the chicken.
     * @type {number}
     */
    width = 70;
  
    /**
     * The height of the chicken.
     * @type {number}
     */
    height = 90;
  
    /**
     * A flag to indicate if the chicken is dead.
     * @type {boolean}
     */
    isDead = false;
  
    /**
     * An array of image paths representing the different images of the chicken walking.
     * @type {string[]}
     */
    IMAGES_WALKING = [
      'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
      'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
      'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
  
    /**
     * An array of image paths representing the different images of the chicken when dead.
     * @type {string[]}
     */
    IMAGES_DEAD = [
      'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
      'img/6_salsa_bottle/bottle_rotation/bottle_splash/background-none.png'
    ];
  
    /**
     * The audio object for the sound of the chicken when dead.
     * @type {HTMLAudioElement}
     */
    chickenDeadSound = new Audio('audio/chicken.mp3');
  
    /**
     * Constructs a new Chicken object.
     */
    constructor() {
      super();
      this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_DEAD);
  
      this.x = 400 + Math.random() * 1100; // Number between 200 and 700
  
      this.speed = 0.10 + Math.random() * 0.5;
      this.animate();
    }
  
    /**
     * A flag to indicate if the chicken should be deleted.
     * @type {boolean}
     */
    toDelete = false;
  
    /**
     * Animates the chicken's movement and appearance.
     */
    animate() {
      const walkingInterval = setInterval(() => {
        this.moveLeft();
      }, 1000 / 60);
  
      const animationInterval = setInterval(() => {
        if (this.isDead) {
          this.playAnimation(this.IMAGES_DEAD);
          this.chickenDeadSound.play();
          setTimeout(() => (this.toDelete = true), 1000);
          clearInterval(animationInterval); // End the animation interval
        } else {
          this.playAnimation(this.IMAGES_WALKING);
        }
      }, 100);
    }
  
    /**
     * Sets the volume for the chicken's dead sound.
     * @param {number} volume - The volume value to set (between 0 and 1).
     */
    setChickenSoundVolume(volume) {
      this.chickenDeadSound.volume = volume;
    }
  }
  