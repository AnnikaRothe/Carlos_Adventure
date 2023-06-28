class MovableObject {
  x = 120;
  y = 200;
  img;
  height = 250;
  width = 130;
  imageCache = {};
  currentImage = 0;
  speed = 0.35;
  otherDirection = false;
  speedY = 0;
  acceleration = 2;
  energy= 100;

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

  // loadImage('img/PfadDesBildes.png')
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {

    if (this instanceof Character || this instanceof Chicken){
    ctx.beginPath();
    ctx.lineWidth = "7";
    ctx.strokeStyle = "green";
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
    }
  }

  isColliding (mo) {
    return  this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
  }
  /**
   *
   * @param {Array} arr - ['img/image1.png, img/image2.png,....]
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  playAnimation(images) {
    let i = this.currentImage % this.IMAGES_WALKING.length; //let i = 0 % 6 (Modulu % ist der mathematische Rest)
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
