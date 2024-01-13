class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 200;
  height = 250;
  width = 130;

  // loadImage('img/PfadDesBildes.png')
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken) {
      ctx.beginPath();
      ctx.lineWidth = "7";
      ctx.strokeStyle = "transparent";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
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
}
