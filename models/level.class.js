class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_End_x = 2200;

    constructor(enemies, clouds, backgroundObjects, bottles, coins){
       this.enemies = enemies;
       this.clouds = clouds;
       this.backgroundObjects = backgroundObjects;
       this.bottles = bottles;
       this.coins = coins;
    }
}