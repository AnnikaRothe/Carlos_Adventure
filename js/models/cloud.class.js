class Cloud extends MovableObject {
  y = 0;
  height = 350;
  width = 500;

  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");

    this.x = Math.random() * 500; //damit die Zahlen nicht zu klein sind für die Pixelanzahl, die wir brauchen
    this.animate();
  }

  animate() {
    this.moveLeft();
  }



}
