/**
 * Represents the main character of the game.
 * @extends MovableObject
 */
class Character extends MovableObject {
  /** @type {number} The vertical position of the character. */
  y = 185;
  /** @type {number} The height of the character. */
  height = 245;
  /** @type {number} The width of the character. */
  width = 130;
  /** @type {number} The movement speed of the character. */
  speed = 10;
  /** @type {number} The amount of bottles the character has collected. */
  bottleAmount = 0;
  /** @type {number} The amount of coins the character has collected. */
  coinsAmount = 0;
  /** @type {World} The game world the character belongs to. */
  world;
  /** @type {boolean} Indicates if the character is sleeping. */
  sleeping = false;
  /** @type {boolean} Indicates if the character's sleeping is timed out. */
  timeoutSleep = false;
  /** @type {number} The timeout for sleeping. */
  sleepingTimeout;
  /** @type {boolean} Indicates if the game is over. */
  gameOver = false;

  /** @type {string[]} An array of paths to walking animation images for the character. */
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  /** @type {string[]} An array of paths to jumping animation images for the character. */
  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  /** @type {string[]} An array of paths to dead animation images for the character. */
  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  /** @type {string[]} An array of paths to hurt animation images for the character. */
  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  /** @type {string[]} An array of paths to idle animation images for the character. */
  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  /** @type {string[]} An array of paths to sleep animation images for the character. */
  IMAGES_SLEEP = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  /** @type {object} The offset values for collision detection of the character. */
  offset = {
    top: 120,
    left: 30,
    right: 40,
    bottom: 30,
  };

  /** @type {Audio} The sound played when the character is walking. */
  walking_sound = new Audio("audio/pepeWalking.mp3");
  /** @type {Audio} The sound played when the character is hurt. */
  hurt_sound = new Audio("audio/pepeHurt.mp3");
  /** @type {Audio} The sound played when the character jumps. */
  jump_sound = new Audio("audio/pepeJump.mp3");

  constructor() {
    /**
     * Loads the image for the character's initial walking state.
     * @type {string}
     */
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");

    /**
     * Loads the images for the character's walking animation.
     * @type {string[]}
     */
    this.loadImages(this.IMAGES_WALKING);

    /**
     * Loads the images for the character's jumping animation.
     * @type {string[]}
     */
    this.loadImages(this.IMAGES_JUMPING);

    /**
     * Loads the images for the character's dead animation.
     * @type {string[]}
     */
    this.loadImages(this.IMAGES_DEAD);

    /**
     * Loads the images for the character's hurt animation.
     * @type {string[]}
     */
    this.loadImages(this.IMAGES_HURT);

    /**
     * Loads the images for the character's idle animation.
     * @type {string[]}
     */
    this.loadImages(this.IMAGES_IDLE);

    /**
     * Loads the images for the character's sleep animation.
     * @type {string[]}
     */
    this.loadImages(this.IMAGES_SLEEP);

    /**
     * Applies gravity to the character.
     */
    this.applyGravity();

    /**
     * Animates the character's movement and actions.
     */
    this.animate();
  }

  /**
   * Animates the character's movement and actions.
   */
  animate() {
    setInterval(() => this.moveCharacter(), 1000 / 60);
    setInterval(() => this.playCharacter(), 100);
  }

  /**
   * Moves the character based on keyboard input and game conditions.
   * Updates the character's position and camera position.
   */
  moveCharacter() {
    this.walking_sound.pause();
    if (this.canMoveRight()) this.moveRight();
    if (this.canMoveLeft()) this.moveLeft();
    if (this.canJump()) {
      this.jump();
      if (!soundMute) {
        this.jump_sound.play();
      }
    }
    this.world.camera_x = -this.x + 100;
  }

  /**
   * Checks if the character can move to the right.
   * @returns {boolean} True if the character can move right, false otherwise.
   */
  canMoveRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
  }

  /**
   * Moves the character to the right.
   */
  moveRight() {
    super.moveRight();
    this.otherDirection = false;
    if (!soundMute) {
      this.walking_sound.play();
    }
  }

  /**
   * Checks if the character can move to the left.
   * @returns {boolean} True if the character can move left, false otherwise.
   */
  canMoveLeft() {
    return this.world.keyboard.LEFT && this.x > 0;
  }

  /**
   * Moves the character to the left.
   */
  moveLeft() {
    super.moveLeft();
    this.otherDirection = true;
    if (!soundMute) {
      this.walking_sound.play();
    }
  }

  /**
   * Checks if the character can perform a jump.
   * @returns {boolean} True if the character can jump, false otherwise.
   */
  canJump() {
    return this.world.keyboard.UP && !this.isAboveGround();
  }

  /**
   * Plays the appropriate animation for the character based on the game state.
   */
  playCharacter() {
    if (this.isDead()) this.characterDead();
    else if (this.isHurt()) this.characterHurts();
    else if (this.isAboveGround()) this.characterIsAboveGround();
    else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)
      this.characterWalks();
    else if (this.sleeping) this.playAnimation(this.IMAGES_SLEEP);
    else this.characterIdle();
  }

  /**
   * Plays the animation for the character's death.
   */
  characterDead() {
    this.sleeping = false;
    this.timeoutSleep = false;
    clearTimeout(this.sleepingTimeout);
    this.gameOver = true;
    this.playAnimation(this.IMAGES_DEAD);
  }

  /**
   * Plays the animation for the character being hurt.
   */
  characterHurts() {
    this.sleeping = false;
    this.timeoutSleep = false;
    clearTimeout(this.sleepingTimeout);
    this.playAnimation(this.IMAGES_HURT);
  }

  /**
   * Plays the animation for the character being in the air.
   */
  characterIsAboveGround() {
    this.sleeping = false;
    this.timeoutSleep = false;
    clearTimeout(this.sleepingTimeout);
    this.playAnimation(this.IMAGES_JUMPING);
  }

  /**
   * Plays the animation for the character walking.
   */
  characterWalks() {
    this.sleeping = false;
    this.timeoutSleep = false;
    clearTimeout(this.sleepingTimeout);
    this.playAnimation(this.IMAGES_WALKING);
  }

  /**
   * Plays the animation for the character being idle.
   */
  characterIdle() {
    this.sleeping = false;
    this.playAnimation(this.IMAGES_IDLE);
    if (!this.timeoutSleep) {
      this.sleepingTimeout = setTimeout(() => {
        this.sleeping = true;
      }, 4000);
      this.timeoutSleep = true;
    }
  }

  /**
   * Makes the character jump.
   */
  jump() {
    this.speedY = 30;
  }

  /**
   * Handles the character being hit.
   * Updates the character's energy and plays the hurt sound if not muted.
   */
  hit() {
    this.energy -= 0.5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
    if (!soundMute) {
      this.hurt_sound.play();
    }
  }
}
