/**
 * Represents a small chicken enemy that can move and be drawn on the canvas.
 * Extends the MovableObject class.
 */
 class SmallChicken extends MovableObject {

    /**
     * The initial Y position of the small chicken.
     * @type {number}
     */
    y = 340;
  
    /**
     * The width of the small chicken.
     * @type {number}
     */
    width = 70;
  
    /**
     * The height of the small chicken.
     * @type {number}
     */
    height = 90;
  
    /**
     * Flag indicating if the small chicken is dead.
     * @type {boolean}
     */
    isDead = false;
  
    /**
     * The array of image paths for the walking animation of the small chicken.
     * @type {string[]}
     */
    IMAGES_WALKING = [
      'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
      'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
      'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
  
    /**
     * The array of image paths for the dead state of the small chicken.
     * @type {string[]}
     */
    IMAGES_DEAD = [
      'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
      'img/6_salsa_bottle/bottle_rotation/bottle_splash/background-none.png'
    ];
  
    /**
     * The audio element for the chicken dead sound.
     * @type {HTMLAudioElement}
     */
    chickenDeadSound = new Audio('audio/chicken.mp3')
  
    constructor() {
      super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_DEAD);
  
      this.x = 400 + Math.random() * 800; // Zahl zwischen 200 und 700
  
      this.speed = 0.12 + Math.random() * 0.5;
      this.animate();
    }
  
    /**
     * Flag indicating if the small chicken is marked for deletion.
     * @type {boolean}
     */
    toDelete = false;
  
    /**
     * Initiates the animation of the small chicken.
     */
    animate() {
      const walkingInterval = setInterval(() => {
        this.moveLeft();
      }, 1000 / 60);
  
      const animationInterval = setInterval(() => {
        if (this.isDead) {
          this.playAnimation(this.IMAGES_DEAD);
          this.chickenDeadSound.play();
          setTimeout(() => this.toDelete = true, 1000);
          clearInterval(animationInterval); // Das Animation-Intervall beenden
        } else {
          this.playAnimation(this.IMAGES_WALKING);
        }
      }, 100);
    }
  }
  