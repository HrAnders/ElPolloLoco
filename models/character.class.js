/**
 * Represents a character object that can move on the canvas.
 * @extends MovableObject
 */
 class Character extends MovableObject {
  /**
   * The height of the character.
   * @type {number}
   */
  height = 280;

  /**
   * The y-coordinate of the character's position.
   * @type {number}
   */
  y = 150; 
  /**
   * The speed at which the character moves.
   * @type {number}
   */
  speed = 10;

  /**
   * An array of image paths representing the different images of the character walking.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png'
  ];

  /**
   * An array of image paths representing the different images of the character jumping.
   * @type {string[]}
   */
  IMAGES_JUMPING = [
    'img/2_character_pepe/3_jump/J-31.png',
    'img/2_character_pepe/3_jump/J-32.png',
    'img/2_character_pepe/3_jump/J-33.png',
    'img/2_character_pepe/3_jump/J-34.png',
    'img/2_character_pepe/3_jump/J-35.png',
    'img/2_character_pepe/3_jump/J-36.png',
    'img/2_character_pepe/3_jump/J-37.png',
    'img/2_character_pepe/3_jump/J-38.png',
    'img/2_character_pepe/3_jump/J-39.png'
  ];

  /**
   * An array of image paths representing the different images of the character when dead.
   * @type {string[]}
   */
  IMAGES_DEAD = [
    'img/2_character_pepe/5_dead/D-51.png',
    'img/2_character_pepe/5_dead/D-52.png',
    'img/2_character_pepe/5_dead/D-53.png',
    'img/2_character_pepe/5_dead/D-54.png',
    'img/2_character_pepe/5_dead/D-55.png',
    'img/2_character_pepe/5_dead/D-56.png',
    'img/2_character_pepe/5_dead/D-57.png'
  ];

  /**
   * An array of image paths representing the different images of the character when hurt.
   * @type {string[]}
   */
  IMAGES_HURT = [
    'img/2_character_pepe/4_hurt/H-41.png',
    'img/2_character_pepe/4_hurt/H-42.png',
    'img/2_character_pepe/4_hurt/H-43.png'
  ];

  /**
   * An array of image paths representing the different images of the character sleeping.
   * @type {string[]}
   */
  IMAGES_SLEEP = [
    'img/2_character_pepe/1_idle/long_idle/I-11.png',
    'img/2_character_pepe/1_idle/long_idle/I-12.png',
    'img/2_character_pepe/1_idle/long_idle/I-13.png',
    'img/2_character_pepe/1_idle/long_idle/I-14.png',
    'img/2_character_pepe/1_idle/long_idle/I-15.png',
    'img/2_character_pepe/1_idle/long_idle/I-16.png',
    'img/2_character_pepe/1_idle/long_idle/I-17.png',
    'img/2_character_pepe/1_idle/long_idle/I-18.png',
    'img/2_character_pepe/1_idle/long_idle/I-19.png',
    'img/2_character_pepe/1_idle/long_idle/I-20.png'
  ];

  /**
   * An array of image paths representing the different images of the character standing.
   * @type {string[]}
   */
  IMAGES_STANDING = [
    'img/2_character_pepe/2_walk/W-21.png'
  ];

  /**
   * The world object associated with the character.
   * @type {World}
   */
  world;

  /**
   * The audio object for the walking sound of the character.
   * @type {HTMLAudioElement}
   */
  walking_sound = new Audio('audio/walking_sound.mp3');

  /**
   * The audio object for the sleeping sound of the character.
   * @type {HTMLAudioElement}
   */
  sleep_sound = new Audio('audio/snoring.mp3');

  /**
   * The timeout ID for the idle timer.
   * @type {?number}
   */
  idleTimeout = null;

  /**
   * A flag to indicate if the idle timeout is started.
   * @type {boolean}
   */
  isIdleTimeoutStarted = false;

  /**
   * A flag to indicate if the character is in a long sleep state.
   * @type {boolean}
   */
  longsleep = false;

  /**
   * A flag to indicate if the character is jumping.
   * @type {boolean}
   */
  isJumping = false;

  /**
   * A flag to indicate if the character is falling.
   * @type {?boolean}
   */
  isFalling = null;
  isMovingRight = false;


  /**
   * Constructs a new Character object.
   */
  constructor() {
    super().loadImage('img/2_character_pepe/2_walk/W-21.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_SLEEP);
    this.applyGravity();
    this.animate();
    this.startIdleTimer();
    this.checkJumpState();
    this.checkJumpDirection();
  }

  /**
   * Animates the character by handling movement, idle, jumping, and sleeping animations.
   */
  animate() {
    setInterval(() => {
      this.walking_sound.pause();
      let isMoving = false; // Flag, um festzustellen, ob eine Aktion ausgeführt wird

      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_End_x) {
        this.moveRight();
        this.otherDirection = false;
        this.walking_sound.play();
        isMoving = true;
        this.isMovingRight = true;
      }

      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.otherDirection = true;
        this.walking_sound.play();
        isMoving = true;
        this.isMovingRight = false;
      }

      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
        isMoving = true;
      }

      this.world.camera_x = -this.x + 100;

      if (!isMoving) {
        this.startIdleTimer(); // Timer für Idle-Animation starten, wenn keine Aktion ausgeführt wird
      } else {
        this.stopIdleTimer(); // Timer stoppen, wenn eine Aktion ausgeführt wird
        this.longsleep = false;
      }
    }, 1000 / 60);

    setInterval(() => {
      //console.log(this.world.character.y)
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        this.showGameOverScreen();
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        if (this.longsleep) {
          this.playAnimation(this.IMAGES_SLEEP);
          this.sleep_sound.play();
        } else {
          this.playAnimation(this.IMAGES_STANDING);
          this.sleep_sound.pause();
        }
      }
    }, 50);
  }

  /**
   * Makes the character jump.
   */
  jump() {
    this.speedY = 30;
  }

  /**
   * Shows the game over screen when the character is dead.
   */
  showGameOverScreen(){
    document.getElementById('GameOverScreen').classList.remove('d-none');
    document.getElementById('LeftRightBtns').classList.add('d-none');
    document.getElementById('startbutton').classList.add('d-none');
    document.getElementById('throwJumpBtns').classList.add('d-none');
    document.getElementById('btnsTop').classList.add('d-none');
    document.getElementById('restartbutton').classList.remove('d-none');
    clearAllIntervals();
  }

  /**
   * Starts the idle timer for the character's sleeping animation.
   */
  startIdleTimer() {
    if (!this.isIdleTimeoutStarted) {
      this.idleTimeout = setTimeout(() => {
        this.longsleep = true;
      }, 5000);
      this.isIdleTimeoutStarted = true;
      //console.log("Timeout wurde gestartet.");
    } else {
      //console.log("Timeout wurde bereits gestartet.");
    }
  }

  /**
   * Stops the idle timer for the character's sleeping animation.
   */
  stopIdleTimer() {
    if (this.idleTimeout) {
      clearTimeout(this.idleTimeout);
      this.idleTimeout = null;
      this.isIdleTimeoutStarted = false;
      //console.log("Timeout wurde gestoppt.");
    }
  }

  /**
   * Sets the volume for the character's walking and sleeping sounds.
   * @param {number} volume - The volume value to set (between 0 and 1).
   */
  setCharacterSoundVolume(volume) {
    this.walking_sound.volume = volume;
    this.sleep_sound.volume = volume;
  }

  /**
   * Checks the jumping state of the character.
   */
  checkJumpState() {
    setInterval(() => {
      if (this.y >= 170) {
        this.isJumping = false;
        this.y = 192.5;
      } else {
        this.isJumping = true;
      }
    }, 100);
  }

  /**
   * Checks the jumping direction of the character.
   */
  checkJumpDirection() {
    let previousY = this.y;

    setInterval(() => {
      let currentY = this.y;
      if ((currentY > previousY) && this.isJumping) {
        this.isFalling = true;
      } else if ((currentY < previousY) && this.isJumping) {
        this.isFalling = false;
      } else {
        this.isFalling = null;
      }
      previousY = currentY;
    }, 100);
  }
}
