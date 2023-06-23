class MovableObject {
  x = 120;
  y = 200;
  img;
  height = 250;
  width = 130;


  // loadImage('img/PfadDesBildes.png')
  loadImage(path) {
    this.img = new Image(); // this.img = document.getElementsById('image')
    this.img.src = path;
  }

  moveRight() {
    console.log("Moving right");
  }

  moveLeft() {}
}
