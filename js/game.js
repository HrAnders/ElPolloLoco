/**
 * Represents the canvas element on which the game is rendered.
 * @type {HTMLCanvasElement}
 */
 let canvas;

 /**
  * Represents the game world.
  * @type {World}
  */
 let world;
 
 /**
  * Provides an object to keep track of the keyboard state.
  * @type {Keyboard}
  */
 let keyboard = new Keyboard();
 
 /**
  * Indicates whether the background music is currently playing.
  * @type {boolean}
  */
 let isMusikPlaying = false;
 
 /**
  * Indicates whether the sound is currently playing.
  * @type {boolean}
  */
 let isSoundPlaying = false;
 
 /**
  * Audio object for the background music sound.
  * @type {HTMLAudioElement}
  */
 let game_sound = new Audio('audio/game-bg-audio.mp3');
 isMovingRight = false;
 
 /**
  * The Init function starts the game and hides the start screen.
  */
 function init() {
   initLevel();    
   canvas = document.getElementById('canvas');
   world = new World(canvas, keyboard);
 
   document.getElementById('startScreen').classList.add('d-none');
   document.getElementById('startbutton').classList.add('d-none');
   document.getElementById('gameSoundOnOff').classList.remove('d-none');
   throwBtns();
   startButtonPress();
   stopButtonPress();
 }

/**
 * Event listener that listens for keydown events and sets corresponding keyboard properties to "true".
 * @param {Event} event - The Keydown event object.
 */
 document.addEventListener("keydown", (event) => {
    if (event.keyCode == 39) {
      /**
       * Represents the state of the right arrow key on the keyboard.
       * @type {boolean}
       */
      keyboard.RIGHT = true;
    }
    if (event.keyCode == 37) {
      /**
       * Represents the state of the left arrow key on the keyboard.
       * @type {boolean}
       */
      keyboard.LEFT = true;
    }
    if (event.keyCode == 38) {
      /**
       * Represents the state of the up arrow key on the keyboard.
       * @type {boolean}
       */
      keyboard.UP = true;
    }
    if (event.keyCode == 40) {
      /**
       * Represents the state of the down arrow key on the keyboard.
       * @type {boolean}
       */
      keyboard.DOWN = true;
    }
    if (event.keyCode == 32) {
      /**
       * Represents the state of the space bar key on the keyboard.
       * @type {boolean}
       */
      keyboard.SPACE = true;
    }
    if (event.keyCode == 68) {
      /**
       * Represents the state of the "D" key on the keyboard.
       * @type {boolean}
       */
      keyboard.D = true;
    }
    if (event.keyCode == 67) {
      /**
       * Represents the state of the "C" key on the keyboard.
       * @type {boolean}
       */
      keyboard.C = true;
      closeFullScreen();
    }
  });
  
  /**
   * Event listener that listens for keyup events and sets corresponding keyboard properties to "false".
   * @param {Event} event - The Keyup event object.
   */
  document.addEventListener("keyup", (event) => {
    if (event.keyCode == 39) {
      keyboard.RIGHT = false;
    }
    if (event.keyCode == 37) {
      keyboard.LEFT = false;
    }
    if (event.keyCode == 38) {
      keyboard.UP = false;
    }
    if (event.keyCode == 40) {
      keyboard.DOWN = false;
    }
    if (event.keyCode == 32) {
      keyboard.SPACE = false;
    }
    if (event.keyCode == 68) {
      keyboard.D = false;
    }
    if (event.keyCode == 67) {
      keyboard.C = false;
    }
  });
  

/**
 * Expands the browser window to the whole screen and adjusts the background image.
 */
 function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    let background = document.getElementsByClassName('background')[0];
    background.style.backgroundImage = "url('img/9_intro_outro_screens/start/app_background.jpg')";
    background.style.backgroundPosition = "center";
    enterFullScreen(fullscreen);
  }
  
  /**
   * Enters the fullscreen mode for the specified element.
   * @param {Element} element - The element to enter fullscreen mode.
   */
  function enterFullScreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    }
  }
  
  /**
   * Exits the fullscreen mode.
   */
  function closeFullScreen() {
    resetBackground();
  }
  
  /**
   * Resets the background image to its original state.
   */
  function resetBackground() {
    let background = document.getElementsByClassName('background')[0];
    background.style.backgroundImage = "img/9_intro_outro_screens/start/app_background.jpg";
    background.style.backgroundPosition = "center";
  }
  
  /**
   * Shows the game story in a DIV.
   */
  function gameInfo() {
    document.getElementById('infoBoxContainer').classList.remove('d-none');
    document.getElementById('gameInfo').classList.remove('d-none');
    document.getElementById('keyboardButtons').classList.add('d-none');
  }
  
  /**
   * Closes the DIV for the game story & game control.
   */
  function closeBox() {
    document.getElementById('infoBoxContainer').classList.add('d-none');
  }
  
  /**
   * Shows the game control buttons in a DIV.
   */
  function gameControl() {
    document.getElementById('infoBoxContainer').classList.remove('d-none');
    document.getElementById('keyboardButtons').classList.remove('d-none');
    document.getElementById('gameInfo').classList.add('d-none');
  }
  
  /**
   * Toggles the background music on/off.
   */
  function musicOnOff() {
    var musicImage = document.getElementById('musicOnOff');
    
    if (isMusikPlaying) {
      musicImage.src = 'img/icons/music-note-mute.png';
      game_sound.pause();
    } else {
      musicImage.src = 'img/icons/music-on-off.png';
      game_sound.play();
    }
    
    isMusikPlaying = !isMusikPlaying;    
  }
  
  /**
   * Handles the muting of the game.
   */
  function gameSoundOnOff() {
    let muteButton = document.getElementById('gameSoundButton');
    if (!world.isMuted) {
      muteButton.src = "img/icons/no-sound.png"
      world.game_sound.muted = true;
      muteCharacter();
      muteEnemies();
      world.isMuted = true;
    } else {
      muteButton.src = "img/icons/gamesound.png"
      world.game_sound.muted = false;
      unmuteCharacter();
      unmuteEnemies();
      world.isMuted = false;
    }
  }
  
  /**
   * Mutes the character sounds.
   */
  function muteCharacter() {
    world.character.walking_sound.muted = true;
    world.character.sleep_sound.muted = true;
  }
  
  /**
   * Unmutes the character sounds.
   */
  function unmuteCharacter() {
    world.character.walking_sound.muted = false;
    world.character.sleep_sound.muted = false;
  }
  
  /**
   * Mutes the enemies' sounds.
   */
  function muteEnemies() {
    world.level.enemies.forEach((enemies) => {
      enemies.chickenDeadSound.muted = true;
    });
  }
  
  /**
   * Unmutes the enemies' sounds.
   */
  function unmuteEnemies() {
    world.level.enemies.forEach((enemies) => {
      enemies.chickenDeadSound.muted = false;
    });
  }
  
  /**
   * Checks the move direction to the right.
   */
  function moveRight() {
    const button = document.getElementById("RIGHT");
    
    button.addEventListener("mousedown", () => {
      keyboard.RIGHT = true;
    });
    
    button.addEventListener("mouseup", () => {
      keyboard.RIGHT = false;
    });
  }
  
  /**
   * Checks the move direction to the left.
   */
  function moveLeft() {
    const button = document.getElementById("LEFT");
    
    button.addEventListener("mousedown", () => {
      keyboard.LEFT = true;
    });
    
    button.addEventListener("mouseup", () => {
      keyboard.LEFT = false;
    });
  }
  
  /**
   * Checks the move direction up (Jump).
   */
  function Jump() {
    const button = document.getElementById("JUMP");
    
    button.addEventListener("mousedown", () => {
      keyboard.SPACE = true;
    });
    
    button.addEventListener("mouseup", () => {
      keyboard.SPACE = false;
    });
  }
  
  /**
   * Checks the throw button to throw a bottle.
   */
   function throwBtns() {
    const button = document.getElementById("THROW");
  
    const isMobile = window.innerWidth <= 480;
  
    if (isMobile) {
      button.addEventListener("touchstart", () => {
        keyboard.D = true;
      });
  
      button.addEventListener("touchend", () => {
        keyboard.D = false;
      });
    }
  }
  
  
  
  /**
   * Handles the touch events for mobile devices on press.
   */
  function startButtonPress() {
    document.getElementById("LEFT").addEventListener("touchstart", (ev) => {
      keyboard.LEFT = true;
      ev.preventDefault();
    });
    
    document.getElementById("RIGHT").addEventListener("touchstart", (ev) => {
      keyboard.RIGHT = true;
      ev.preventDefault();
    });
    
    document.getElementById("JUMP").addEventListener("touchstart", (ev) => {
      keyboard.SPACE = true;
      ev.preventDefault();
    });
    
    document.getElementById("THROW").addEventListener("touchstart", (ev) => {
      keyboard.d = true;
      ev.preventDefault();
    });
  }
  
  /**
   * Handles the touch events for mobile devices on release.
   */
  function stopButtonPress() {
    document.getElementById("LEFT").addEventListener("touchend", (ev) => {
      keyboard.LEFT = false;
      ev.preventDefault();
    });
    
    document.getElementById("RIGHT").addEventListener("touchend", (ev) => {
      keyboard.RIGHT = false;
      ev.preventDefault();
    });
    
    document.getElementById("JUMP").addEventListener("touchend", (ev) => {
      keyboard.SPACE = false;
      ev.preventDefault();
    });
    
    document.getElementById("THROW").addEventListener("touchend", (ev) => {
      keyboard.d = false;
      ev.preventDefault();
    });
  }
  
  /**
   * Reloads the page and hides the GameOverScreen.
   */
  function loadNew() {
    location.reload();
    document.getElementById('GameOverScreen').classList.add('d-none');
  }
  
  /**
   * Clears all intervals in the game.
   */
  function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) {
      window.clearInterval(i);
    }
  }