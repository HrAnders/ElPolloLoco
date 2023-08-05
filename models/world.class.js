/**
 * Represents the game world.
 */
 class World {
  /**
   * The character object representing the player.
   * @type {Character}
   */
  character = new Character();

  /**
   * The Endboss object representing the boss enemy.
   * @type {Endboss}
   */
  Endboss = level1.enemies[level1.enemies.length - 1];

  /**
   * The current level of the game.
   * @type {Level}
   */
  level = level1;

  /**
   * The canvas context used for drawing.
   * @type {CanvasRenderingContext2D}
   */
  ctx;

  /**
   * The game canvas element.
   * @type {HTMLCanvasElement}
   */
  canvas;

  /**
   * The keyboard input manager.
   * @type {Keyboard}
   */
  keyboard;

  /**
   * The camera x-coordinate.
   * @type {number}
   */
  camera_x = 0;

  /**
   * The status bar for displaying character's health.
   * @type {StatusBar}
   */
  statusBar = new StatusBar();

  /**
   * The bottle bar for displaying the number of bottles.
   * @type {BottleBar}
   */
  bottleBar = new BottleBar();

  /**
   * The coin bar for displaying the number of coins.
   * @type {CoinBar}
   */
  coinBar = new CoinBar();

  /**
   * The Endboss health bar.
   * @type {BossBar}
   */
  EndbossBar = new BossBar();

  /**
   * An array of throwable objects in the world.
   * @type {throwableObjects[]}
   */
  throwableObjects = [];

  /**
   * The game background audio.
   * @type {HTMLAudioElement}
   */
  game_sound = new Audio("audio/game-bg-audio.mp3");

  /**
   * The number of bottles in the game.
   * @type {number}
   */
  bottleAmount = 0;

  /**
   * The number of coins collected in the game.
   * @type {number}
   */
  coinAmount = 0;

  /**
   * A flag indicating whether the game sound is muted or not.
   * @type {boolean}
   */
  isMuted = false;

  /**
   * A flag to track whether the EndbossBar has been shown.
   * @type {boolean}
   */
  EndbossBarShown = false;

  /**
   * Creates a new World instance.
   * @param {HTMLCanvasElement} canvas - The game canvas element.
   * @param {Keyboard} keyboard - The keyboard input manager.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Sets the world for character and level.
   */
  setWorld() {
    this.character.world = this;
    this.level.world = this;
  }

  /**
   * Runs the game loop to check collisions and throwable objects.
   */
   run() {
    // Führe checkCollisions() alle 50 Millisekunden aus
    setInterval(() => {
      this.checkCollisions();
    }, 50);
  
    // Führe checkThrowObjects() alle 500 Millisekunden aus
    setInterval(() => {
      this.checkThrowObjects();
    }, 500);
  }
  

  /**
   * Checks if the character throws a bottle and manages the bottle bar.
   */
  checkThrowObjects() {
    if (this.character.bottleAmount > 0 && this.keyboard.D && this.character.isMovingRight) {
      let bottle = new throwableObjects(
        this.character.x + 100,
        this.character.y + 100,
        this.isMuted
      );
      this.throwableObjects.push(bottle);
      this.character.throwBottle();
      this.bottleBar.setPercentage(this.character.bottleAmount);
    }
  }

  /**
   * Checks for collisions between character and enemies, as well as throwable objects and enemies.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !enemy.isDead) {
        if (this.character.isAboveGround() && !this.character.isHurt()) {
          enemy.isDead = true;
        } else {
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
        }
      }
      if (
        this.character.isColliding(this.Endboss) &&
        !this.Endboss.isDeadBoss
      ) {
        this.character.hitEndboss(); // Or call an appropriate method on the character object for handling the Endboss hit
        this.statusBar.setPercentage(this.character.energy);
      }
    });

    this.checkCollisionWithBottle();
    this.checkCollectibleCollision();
    this.clearDeadEnemies();
  }

  /**
   * Checks for collisions between throwable objects and enemies, updates Endboss health, and handles animations.
   */
  checkCollisionWithBottle() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy) && !enemy.isDead) {
          enemy.isDead = true;
          bottle.isBroken = true;
        }
        if (bottle.isColliding(this.Endboss) && !this.Endboss.isDeadBoss) {
          bottle.isBroken = true;
          this.Endboss.hitEnboss();
          this.EndbossBar.setPercentage(this.Endboss.energy);
          if (this.Endboss.energy <= 0) {
            this.Endboss.playDeadAnimation(); // Dead-Bilder abspielen, wenn der Endboss keine Energie mehr hat
          } else {
            this.Endboss.playImages(); // Hurt-Bilder abspielen, wenn der Endboss getroffen wurde
          }
        }
      });
    });
  }

  /**
   * Removes dead enemies from the level.
   */
  clearDeadEnemies() {
    const deleteEnemiesExcluded = this.level.enemies.filter((e) => !e.toDelete);
    this.level.enemies = deleteEnemiesExcluded;
  }

  /**
   * Handles collision with bottles and coins, updates the respective bars, and removes the collectibles.
   */
  checkCollectibleCollision() {
    this.level.bottles.forEach((collectible, index) => {
      if (
        this.character.isColliding(collectible) &&
        collectible instanceof Bottle
      ) {
        this.character.hitBottle();
        this.bottleBar.setPercentage(this.character.bottleAmount);
        this.level.bottles.splice(index, 1);
        collectible = null;
      }
    });

    this.level.coins.forEach((collectible, index) => {
      if (
        this.character.isColliding(collectible) &&
        collectible instanceof Coins
      ) {
        this.character.hitCoins();
        this.coinBar.setPercentage(this.character.coinAmount);
        this.level.coins.splice(index, 1);
        collectible = null;
      }
    });
  }

  /**
   * Draws the game world and its objects.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.bottleBar);
    this.addToMap(this.coinBar);

    // Prüfe, ob der Boss den gewünschten X-Wert (1950 in diesem Fall) überschritten hat oder ob die EndbossBar bereits gezeigt wurde
    if (this.character.x > 1950 || this.EndbossBarShown) {
      this.addToMap(this.EndbossBar);
      this.EndbossBarShown = true; // Setze die Flagge auf true, sobald die EndbossBar angezeigt wird
    }

    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);

    // draw() wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Adds an array of objects to the game map for drawing.
   * @param {Object[]} objects - An array of drawable objects.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a drawable object to the game map for drawing.
   * @param {DrawableObject} mo - The drawable object to be added to the map.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.ctx.save();
      this.ctx.translate(mo.width, 0);
      this.ctx.scale(-1, 1);
      mo.x = mo.x * -1;
    }

    // Hier werden die Informationen aus dem Objekt extrahiert
    const x = mo.x; // Die x-Position des Objekts
    const y = mo.y; // Die y-Position des Objekts
    const width = mo.width; // Die Breite des Objekts
    const height = mo.height; // Die Höhe des Objekts

    // Den blauen Rahmen um das Objekt zeichnen
    /*this.drawFrame(x, y, width, height);*/

    mo.draw(this.ctx);

    if (mo.otherDirection) {
      mo.x = mo.x * -1;
      this.ctx.restore();
    }
  }
}
