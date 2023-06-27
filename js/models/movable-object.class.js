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

  // loadImage('img/PfadDesBildes.png')
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
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
    console.log("Moving right");
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000/60);
  }
}
