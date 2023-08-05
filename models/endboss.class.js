/**
 * Represents an end boss character that can be drawn and animated on the canvas.
 */
 class Endboss extends MovableObject {
  /**
   * The height of the end boss character.
   * @type {number}
   */
  height = 400;

  /**
   * The width of the end boss character.
   * @type {number}
   */
  width = 250;

  /**
   * The y-coordinate of the end boss character.
   * @type {number}
   */
  y = 50;

  /**
   * The movement speed of the end boss character.
   * @type {number}
   */
  speed = 12;

  /**
   * Flag indicating if the end boss is dead.
   * @type {boolean}
   */
  isDeadBoss = false;

  /**
   * Flag indicating if the end boss is hurt.
   * @type {boolean}
   */
  isHurtBoss = false;

  /**
   * Flag indicating if the end boss is attacking.
   * @type {boolean}
   */
  isAttackBoss = false;

  /**
   * Flag indicating if the end boss made first contact with the character.
   * @type {boolean}
   */
  firstContact = false;

  /**
   * Flag indicating if the end boss is currently moving.
   * @type {boolean}
   */
  isMoving = false;

  /**
   * Audio element for the chicken dead sound.
   * @type {HTMLAudioElement}
   */
  chickenDeadSound = new Audio('audio/chicken.mp3');

  /**
   * Array of image paths representing the intro animation of the end boss.
   * @type {string[]}
   */
  IMAGES_INTRO = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png',
  ];

  /**
   * Array of image paths representing the walking animation of the end boss.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
    'img/4_enemie_boss_chicken/1_walk/G4.png',
  ];

  /**
   * Array of image paths representing the attack animation of the end boss.
   * @type {string[]}
   */
  IMAGES_ATTACK = [
    'img/4_enemie_boss_chicken/3_attack/G13.png',
    'img/4_enemie_boss_chicken/3_attack/G14.png',
    'img/4_enemie_boss_chicken/3_attack/G15.png',
    'img/4_enemie_boss_chicken/3_attack/G16.png',
    'img/4_enemie_boss_chicken/3_attack/G17.png',
    'img/4_enemie_boss_chicken/3_attack/G18.png',
    'img/4_enemie_boss_chicken/3_attack/G19.png',
    'img/4_enemie_boss_chicken/3_attack/G20.png',
  ];

  /**
   * Array of image paths representing the hurt animation of the end boss.
   * @type {string[]}
   */
  IMAGES_HURT = [
    'img/4_enemie_boss_chicken/4_hurt/G21.png',
    'img/4_enemie_boss_chicken/4_hurt/G22.png',
    'img/4_enemie_boss_chicken/4_hurt/G23.png',
  ];

  /**
   * Array of image paths representing the dead animation of the end boss.
   * @type {string[]}
   */
  IMAGES_DEAD = [
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G25.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png',
  ];

  /**
   * Creates a new instance of Endboss.
   * Initializes the end boss character with default values and loads the images.
   */
  constructor() {
    super().loadImage(this.IMAGES_INTRO[0]);
    this.loadImages(this.IMAGES_INTRO);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 2500;
    this.animate();
  }

  /**
   * Animates the end boss character.
   */
  animate() {
    this.checkFirstContact();
    setInterval(() => {
      this.move();
      this.playImages();
    }, 100);
  }

  /**
   * Moves the end boss character to the left if it can move.
   */
  move() {
    if (this.canMove()) {
      this.moveLeft();
    }
  }

  /**
   * Sets the volume of the chicken dead sound.
   * @param {number} volume - The volume level (0 to 1).
   */
  setBossSoundVolume(volume) {
    this.chickenDeadSound.volume = volume;
  }

  /**
   * Checks if the end boss character made first contact with the character.
   */
  checkFirstContact() {
    let checkFirstContactInterval = setInterval(() => {
      if (world.character && world.character.x > 1950 && !this.firstContact) {
        this.firstContact = true;
        this.isMoving = true;
        clearInterval(checkFirstContactInterval);
      }
    }, 100);
  }

  /**
   * Plays the appropriate images based on the current state of the end boss character.
   */
  playImages() {
    if (this.isDead() || this.x <= 0) {
      this.playAnimation(this.IMAGES_DEAD);
      this.showGameOverScreen();
      this.isMoving = false;
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
      this.chickenDeadSound.play();
      this.isMoving = true;
    } else if (this.isAttackBoss) {
      this.playAnimation(this.IMAGES_ATTACK);
      this.isMoving = true;
    } else if (this.canMove()) {
      this.playAnimation(this.IMAGES_WALKING);
      this.isMoving = true;
    } else {
      this.playAnimation(this.IMAGES_INTRO);
    }
  }

  /**
   * Checks if the end boss character can move (not dead, not hurt, made first contact, and currently moving).
   * @returns {boolean} True if the end boss can move, false otherwise.
   */
  canMove() {
    return !(this.isDead() || this.isHurt()) && this.firstContact && this.isMoving;
  }

  /**
   * Plays the dead animation of the end boss character.
   */
  playDeadAnimation() {
    let i = 0;
    const deadAnimationInterval = setInterval(() => {
      if (i >= this.IMAGES_DEAD.length) {
        clearInterval(deadAnimationInterval);
        this.isDeadBoss = true;
      } else {
        this.loadImage(this.IMAGES_DEAD[i]);
        i++;
      }
    }, 100);
  }

  /**
   * Shows the game over screen when the end boss character is dead.
   */
  showGameOverScreen() {
    document.getElementById('GameOverScreen').classList.remove('d-none');
    document.getElementById('LeftRightBtns').classList.add('d-none');
    document.getElementById('startbutton').classList.add('d-none');
    document.getElementById('throwJumpBtns').classList.add('d-none');
    document.getElementById('btnsTop').classList.add('d-none');
    document.getElementById('restartbutton').classList.remove('d-none');
    clearAllIntervals();
  }
}
