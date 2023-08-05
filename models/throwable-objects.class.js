/**
 * Represents throwable objects, such as bottles, that inherit from the MovableObject class.
 */
 class throwableObjects extends MovableObject {

  /**
   * The array of image paths for bottle rotation animation.
   * @type {string[]}
   */
  IMAGES_ROTATION = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
  ];

  /**
   * The array of image paths for bottle splash animation.
   * @type {string[]}
   */
  IMAGES_SPLASH = [
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/background-none.png',
  ];

  /**
   * The audio object for the glass splash sound.
   * @type {HTMLAudioElement}
   */
  glass_hit_sound = new Audio('audio/glass_splash.mp3');

  /**
   * The flag indicating whether the throwableObjects instance is muted or not.
   * @type {boolean}
   */
  isMuted;

  /**
   * Creates a new throwableObjects instance.
   * @param {number} x - The initial x-coordinate of the object.
   * @param {number} y - The initial y-coordinate of the object.
   * @param {boolean} isMuted - A flag indicating whether the object's sound is muted.
   */
  constructor(x, y, isMuted) {
    super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.isMuted = isMuted;
    this.height = 60;
    this.width = 50;
    this.throw();
    this.toggleMute();
  };

  moveInterval;
  isBroken = false;

  /**
   * Throws the throwable object and initiates animations.
   */
   throw() {
    this.speedY = 30;
    this.applyGravity();
    this.animateBottle();
    this.moveInterval = setInterval(() => {
      if (this.y < 350) {
        this.x += 10;
      } else {
        this.isBroken = true;
        this.currentImage = 0;
        this.glass_hit_sound.play();
        clearInterval(this.applyGravityInterval);
        clearInterval(this.moveInterval);
        if (this.isBroken = true) {
          // Additional actions when the object is broken.
        }
      }
    }, 25);
  };

  moveSplashInterval;

  /**
   * Animates the bottle with rotation and splash animation.
   */
  animateBottle() {
    this.moveSplashInterval = setInterval(() => {
      if (this.y < 350) {
        this.playAnimation(this.IMAGES_ROTATION);
      } else {
        this.playAnimation(this.IMAGES_SPLASH);
        if (this.currentImage == this.IMAGES_SPLASH.length)
          clearInterval(this.moveSplashInterval);
      }
    }, 20);
  }

  /**
   * Sets the volume of the glass hit sound.
   * @param {number} volume - The volume level (0.0 to 1.0).
   */
  setBottleSoundVolume(volume) {
    this.glass_hit_sound.volume = volume;
  }

  /**
   * Toggles the mute state of the throwableObjects instance's sound.
   */
  toggleMute() {
    if (this.isMuted) {
      this.glass_hit_sound.muted = true;
      this.isMuted = true;
    }
    else if (!this.isMuted) {
      this.glass_hit_sound.muted = false;
      this.isMuted = false;
    }
  }

}
