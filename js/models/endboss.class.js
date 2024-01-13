/**
 * Represents the end boss character in the game.
 */
class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 55;
  startWalking = false;
  energy = 2;
  firstContact = false;
  endbossGameOver = false;

  endboss_music = new Audio("audio/endboss_music.mp3");

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  offset = {
    top: 20,
    left: 20,
    right: 20,
    bottom: 0,
  };

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 2500;
    this.speed = 5;
    this.animateFirstContact();
    this.animate();
    this.animateHit();

  }

  /**
   * Animates the movement and actions of the end boss character.
   */
  animate() {
    this.intervallEnbossAnimation = setInterval(() => {
      if (this.endbossCanStart()) {
        this.playAnimation(this.IMAGES_WALKING);
        if (!soundMute) {
          game_music.pause();
          this.endboss_music.play();
        }
      } else if (this.endbossHurt()) {
        this.playAnimation(this.IMAGES_HURT);     
      } else if (this.endbossIsDead()) {
        this.speed = 0;
        this.playAnimation(this.IMAGES_DEAD);
        winGame();
      }
    }, 2000);
    this.checkDistance();
  }

  /**
  /**
   * Checks if the end boss character can start walking.
   * @returns {boolean} `true` if the end boss can start walking, `false` otherwise.
   */
  endbossCanStart() {
    return this.startWalking && !this.isHurt() && !this.isDead();
  }

  /**
   * Checks if the end boss character is hurt.
   * @returns {boolean} `true` if the end boss is hurt, `false` otherwise.
   */
  endbossHurt() {
    return this.startWalking && this.isHurt() && !this.isDead();
  }

  /**
   * Checks if the end boss character is dead.
   * @returns {boolean} `true` if the end boss is dead, `false` otherwise.
   */
  endbossIsDead() {
    return this.startWalking && this.isDead();
  }

  /**
   * Animates the first contact of the end boss character with the player.
   */
  animateFirstContact() {
    let i = 0;
    clearInterval(this.intervallEnbossAnimation);
    this.endbossFirstContactIntervall = setInterval(() => {
      if (i < 10) {
        this.playAnimation(this.IMAGES_ALERT);
      } else {
        this.playAnimation(this.IMAGES_ATTACK);
      }
      i++;
      if (world.character.x > 1900 && !this.firstContact) {
        i = 0;
        this.firstContact = true;
      }
    }, 3000);
  }

  /**
   * Animates the hit state of the end boss character.
   */
  animateHit() {
    setInterval(() => {
      if (this.endbossHit) {
        this.playAnimation(this.IMAGES_HURT);
      }
    }, 5000);
  }

  /**
   * Checks the distance between the end boss and the player.
   */
  checkDistance() {
    let counter = 0;
    const interval = setInterval(() => {
      if (this.startWalking) {
        this.moveLeft();
        counter++;
        if (counter >= 7) {
          this.playAnimation(this.IMAGES_ATTACK);
        }
      }
    }, 1000 / 30);
  }
}
