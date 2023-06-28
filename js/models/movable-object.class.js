class MovableObject extends DrawableObject {
 
  speed = 0.35;
  otherDirection = false;
  speedY = 0;
  acceleration = 2;
  energy = 100;
  lastHit = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 100;
  }


  isColliding(mo) {
    return (
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x &&
      this.y < mo.y + mo.height
    );
  }

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; //Differenz in Millisekunden
    timePassed = timePassed / 1000; // Differenz in Sekunden
    return timePassed < 1; //wenn Pepe innerhalb der letzten 1 Sekunden getroffen wurde, dann true (Animation wird abgespielt)
  }

  isDead() {
    return this.energy == 0;
  }


  playAnimation(images) {
    let i = this.currentImage % images.length; //let i = 0 % 6 (Modulu % ist der mathematische Rest)
    // i = 0,1,2,3,4,5,0,1,2,3,4,5,0....
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 27;
  }
}
