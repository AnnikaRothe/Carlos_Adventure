/**
 * Represents the game world.
 */
class World {
  character = new Character();
  level = level1;
  endboss = new Endboss();
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBarHealth = new StatusBarHealth();
  statusBarBottles = new StatusBarBottles();
  statusBarCoins = new StatusBarCoins();
  statusBarEndboss = new StatusBarEndboss();
  throwableObjects = [];
  soundOff = false;
  chicken_sound = new Audio("audio/chicken.mp3");
  small_chicken_sound = new Audio("audio/small_chicken.mp3");
  bottle_sound = new Audio("audio/bottle.mp3");
  coin_sound = new Audio("audio/coin.mp3");
  angry_endboss_sound = new Audio("audio/endboss_music.mp3");
  bottle_splash_sound = new Audio("audio/bottle_splash.mp3");
  bottle_rotate_sound = new Audio("audio/bottle_rotate.mp3");

  /**
   * Creates a new instance of the World class.
   * @param {HTMLCanvasElement} canvas - The canvas element for rendering.
   * @param {Keyboard} keyboard - The keyboard object for input handling.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.putCloudsInPlace();
    this.putBottlesInPlace();
    this.putCoinsInPlace();
  }

  /**
 * Sets the character's world property to this World instance.
 */
  setWorld() {
    this.character.world = this;
  }

 /**
 * Starts the game loop, running at 50 frames per second.
 * Also checks for various game conditions in each iteration.
 */
  run() {
    setInterval(() => {
      this.checkJumpOnEnemy();
      this.checkCollisions();
      this.checkCollisionEndboss();
      this.checkBottleCollisions();
      this.checkBottleCollisionEndboss();
      this.checkCollectingBottle();
      this.checkCollectingCoins();
      this.endbossStart();
      this.checkGameOver();
      this.checkWinGame();
      this.createStatusBarEndboss();
      this.changeStatusBarEndboss();
    }, 1000 / 50);
    this.checkThrowing();
  }

/**
 * Draws the entire game world on the canvas.
 */
  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.drawFixedObjects();
    this.drawObjects();
    this.ctx.translate(-this.camera_x, 0);
    this.runDrawing();
  }

  /**
 * Draws the status bars on the screen (health, bottles, coins, endboss).
 */
  drawStatusBars() {
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarBottles);
    this.addToMap(this.statusBarCoins);
    this.addToMap(this.statusBarEndboss);
  }

  /**
 * Draws fixed objects, including status bars, on the screen.
 */
  drawFixedObjects() {
    this.ctx.translate(-this.camera_x, 0);
    this.drawStatusBars();
    this.ctx.translate(this.camera_x, 0);
  }

  /**
 * Draws dynamic objects (character, endboss, enemies, bottles, coins, throwable objects) on the screen.
 */
  drawObjects() {
    this.addToMap(this.character);
    this.addToMap(this.endboss);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.throwableObjects);
  }

   /**
 * Initiates the game drawing by calling draw() and requesting a new animation frame.
 */
  runDrawing() {
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
 * Randomly positions the clouds in the game world.
 */
  putCloudsInPlace() {
    this.level.clouds[0].x = Math.random() * 500;
    this.level.clouds[1].x = Math.random() * 500 + 1000;
    this.level.clouds[2].x = Math.random() * 500 + 2000;
  }

  putBottlesInPlace() {
    this.level.bottles[0].x = 430;
    this.level.bottles[1].x = 490;
    this.level.bottles[2].x = 850;
    this.level.bottles[2].y = 140;
    this.level.bottles[3].x = 910;
    this.level.bottles[3].y = 110;
    this.level.bottles[4].x = 930;
    this.level.bottles[4].y = 200;
    this.level.bottles[5].x = 1410;
    this.level.bottles[6].x = 1800;
    this.level.bottles[6].y = 90;
    this.level.bottles[7].x = 1870;
    this.level.bottles[7].y = 120;
    this.level.bottles[8].x = 1900;
    this.level.bottles[9].x = 1950;
  }

  putCoinsInPlace() {
    this.level.coins[0].x = 650;
    this.level.coins[1].x = 720;
    this.level.coins[2].x = 1100;
    this.level.coins[3].x = 1300;
    this.level.coins[3].y = 200;
    this.level.coins[4].x = 1300;
    this.level.coins[4].y = 100;
    this.level.coins[5].x = 1750;
    this.level.coins[5].y = 105;
    this.level.coins[6].x = 2000;
    this.level.coins[7].x = 2200;
  }

  /**
 * Adds an array of objects to the game world.
 * @param {Object[]} objects - The array of objects to add.
 */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
 * Adds a movable object to the game world and optionally flips its image horizontally.
 * @param {MovableObject} mo - The movable object to add to the map.
 */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
 * Flips the image of a movable object horizontally.
 * @param {MovableObject} mo - The movable object whose image to flip.
 */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
 * Restores the original orientation of a movable object's image after flipping.
 * @param {MovableObject} mo - The movable object whose image to restore.
 */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
 * Checks if the character collects bottles and updates the game state accordingly.
 */
  checkCollectingBottle() {
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.character.bottleAmount++;
        this.statusBarBottles.setBottleAmount(this.character.bottleAmount);
        this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
        if (!soundMute) {
          this.bottle_sound.play();
        }
      }
    });
  }

  checkCollectingCoins() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.character.coinsAmount++;
        this.statusBarCoins.setCoinsAmount(this.character.coinsAmount);
        this.level.coins.splice(this.level.coins.indexOf(coin), 1);
        if (!soundMute) {
          this.coin_sound.play();
        }
      }
    });
  }

  /**
 * Checks if the character can throw bottles and performs the throw action.
 */
  checkThrowObjects() {
    if (this.canThrow()) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100
      );
      this.throwableObjects.push(bottle);
      bottle.throw();
      bottle.startThrow = true;
      this.character.bottleAmount--;
      this.statusBarBottles.setBottleAmount(this.character.bottleAmount);
      if (!soundMute) {
        this.bottle_rotate_sound.play();
      }
    }
  }

  /**
 * Helper function to determine if the character can throw a bottle.
 * @returns {boolean} - True if the character can throw a bottle, otherwise false.
 */
  canThrow() {
    return (
      this.keyboard.SPACE &&
      this.character.bottleAmount > 0 &&
      this.character.otherDirection == false
    );
  }

  /**
 * Checks if the character can throw bottles in the other direction and performs the throw action.
 */
  checkThrowObjectsOtherDirection() {
    if (this.canThrowOtherDirection()) {
      let bottle = new ThrowableObject(
        this.character.x,
        this.character.y + 100
      );
      bottle.otherDirection = true;
      this.throwableObjects.push(bottle);
      bottle.throwOtherDirection();
      bottle.startThrow = true;
      this.character.bottleAmount--;
      this.statusBarBottles.setBottleAmount(this.character.bottleAmount);
    }
  }

  /**
 * Helper function to determine if the character can throw a bottle in the other direction.
 * @returns {boolean} - True if the character can throw a bottle in the other direction, otherwise false.
 */
  canThrowOtherDirection() {
    return (
      this.keyboard.D &&
      this.character.bottleAmount > 0 &&
      this.character.otherDirection
    );
  }

  /**
 * Checks if the character can throw objects and performs the throw action.
 * Checks for throwing in both directions: current direction and other direction.
 * Executes every 200 milliseconds.
 */
  checkThrowing() {
    setInterval(() => {
      this.checkThrowObjects();
      this.checkThrowObjectsOtherDirection();
    }, 200);
  }

  /**
 * Hits an enemy with a bottle, plays appropriate sounds,
 * updates the bottle's state, enemy's state, and removes the enemy from the game.
 * @param {Enemy} enemy - The enemy to hit with the bottle.
 * @param {ThrowableObject} bottle - The bottle that hits the enemy.
 */
  hitEnemy(enemy, bottle) {
    this.hitEnemySounds(enemy);
    bottle.bottleHit = true;
    bottle.y = enemy.y;
    bottle.speedY = -5;
    enemy.speed = 0;
    this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
  }

  /**
 * Plays appropriate sounds when hitting an enemy with a bottle.
 * @param {Enemy} enemy - The enemy being hit.
 */
  hitEnemySounds(enemy) {
    if (!soundMute) {
      this.bottle_splash_sound.play();
      if (enemy.smallChicken) {
        this.small_chicken_sound.play();
      } else {
        this.chicken_sound.play();
      }
    }
  }

  /**
 * Checks for collisions between the character and enemies and handles the game logic accordingly.
 */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (
        this.character.isColliding(enemy) &&
        this.character.speedY >= 0 &&
        enemy.energy != 10
      ) {
        this.character.hit();
        this.statusBarHealth.setPercentage(this.character.energy);
      }
    });
  }

  /**
 * Checks if the character jumps on top of an enemy and updates the game state accordingly.
 */
  checkJumpOnEnemy() {
    this.level.enemies.forEach((enemy) => {
      if (this.collisionFromAbove(enemy)) {
        this.jumpOnEnemySound(enemy);
        enemy.energy = 10;
        enemy.speed = 0;
        setTimeout(() => {
          this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
        }, 200);
      }
    });
  }

  /**
 * Plays appropriate sounds when the character jumps on top of an enemy.
 * @param {Enemy} enemy - The enemy being jumped on.
 */
  jumpOnEnemySound(enemy) {
    if (!soundMute) {
      if (enemy.smallChicken) {
        this.small_chicken_sound.play();
      } else {
        this.chicken_sound.play();
      }
    }
  }

  /**
 * Checks if the character collides with an enemy from above.
 * @param {Enemy} enemy - The enemy to check for collision with.
 * @returns {boolean} - True if the character collides with the enemy from above, otherwise false.
 */
  collisionFromAbove(enemy) {
    return (
      this.character.isColliding(enemy) &&
      this.character.speedY < 0 &&
      enemy.energy != 10
    );
  }

  /**
 * Starts the movement of the end boss when the character reaches a certain position.
 * Clears the interval used for the end boss's initial contact.
 */
  endbossStart() {
    if (this.character.x > 2100) {
      this.endboss.startWalking = true;
      clearInterval(this.endboss.endbossFirstContactIntervall);
    }
  }

  /**
 * Creates the status bar for the end boss and adjusts its dimensions based on the game state.
 */
  createStatusBarEndboss() {
    if (!this.endboss.startWalking) {
      this.statusBarEndboss.height = 0;
      this.statusBarEndboss.width = 0;
    } else {
      this.statusBarEndboss.height = 40;
      this.statusBarEndboss.width = 170;
    }
  }

  /**
 * Adjusts the position of the end boss's status bar based on the window size.
 */
  changeStatusBarEndboss() {
    if (fullScreen && window.innerWidth < 1260 && window.innerWidth > 865) {
      this.statusBarEndboss.x = 240;
    }
    if (window.innerWidth < 865) {
      this.statusBarEndboss.y = 50;
    }
  }

  /**
 * Checks for collisions between bottles and enemies, and handles the game logic accordingly.
 */
  checkBottleCollisions() {
    for (let i = 0; i < this.level.enemies.length; i++) {
      let enemy = this.level.enemies[i];
      this.throwableObjects.forEach((bottle) => {
        if (bottle.isColliding(enemy)) {
          this.hitEnemy(enemy, bottle);
        }
      });
    }
  }

  /**
 * Checks for collisions between bottles and the end boss, and handles the game logic accordingly.
 */
  checkBottleCollisionEndboss() {
    this.throwableObjects.forEach((bottle) => {
      if (bottle.isColliding(this.endboss)) {
        bottle.bottleHit = true;
        bottle.speedY = -5;
        this.endboss.hit();
        this.endboss.speed = 0;
        this.statusBarEndboss.setPercentage(this.endboss.energy);
        setTimeout(() => {
          this.endboss.speed = 1.5;
        }, 1000);
        this.throwableObjects.splice(this.throwableObjects.indexOf(bottle), 1);
        if (!soundMute) {
          this.angry_endboss_sound.play();
        }
      }
    });
  }

  /**
 * Checks for collisions between the character and the end boss, and handles the game logic accordingly.
 */
  checkCollisionEndboss() {
    if (this.character.isColliding(this.endboss)) {
      this.character.energy = 0;
      this.character.hit();
      this.statusBarHealth.setPercentage(this.character.energy);
    }
  }

  /**
 * Checks if the game has been won and triggers the corresponding actions.
 */
  checkWinGame() {
    if (this.endboss.endbossGameOver) {
      this.endboss.endboss_music.pause();
      this.character.walking_sound.pause();
      winGame();
    }
  }

    /**
 * Checks if the game is lost and triggers the corresponding actions.
 */
  checkGameOver() {
    if (this.character.gameOver) {
      this.endboss.endboss_music.pause();
      this.character.walking_sound.pause();
      gameOver();
    }
  }
}
