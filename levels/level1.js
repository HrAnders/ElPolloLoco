/**
 * The level object representing the first level of the game.
 * @type {Level}
 */
 let level1;

 /**
  * Initializes the first level of the game.
  */
 function initLevel() {
   // Create a new Level object with the specified entities and background objects
   level1 = new Level(
     // List of enemies in the level
     [
       new Chicken(),
       new SmallChicken(),
       new Endboss()
     ],
     // List of clouds in the level
     [
       new Cloud()
     ],
     // List of background objects in the level
     [
       new BackgroundObject('img/5_background/layers/air.png', -719),
       new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
       new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
       new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
 
       new BackgroundObject('img/5_background/layers/air.png', 0),
       new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
       new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
       new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
       new BackgroundObject('img/5_background/layers/air.png', 719),
       new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
       new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
       new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
 
       new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
       new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
       new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
       new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),
       new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
       new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
       new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
       new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3)
     ],
     // List of bottle objects in the level
     [
       new Bottle(),
       new Bottle(),
       new Bottle(),
       new Bottle(),
       new Bottle(),
       new Bottle(),
       new Bottle(),
       new Bottle(),
       new Bottle(),
       new Bottle()
     ],
     // List of coins in the level
     [
       new Coins(),
       new Coins(),
       new Coins(),
       new Coins(),
       new Coins(),
       new Coins(),
       new Coins(),
       new Coins(),
       new Coins(),
       new Coins()
     ]
   );
 }
 