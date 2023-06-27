
class Character extends MovableObject {
  height = 330;
  y = 120;
  speed = 5;

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

 world;

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);

    this.animate();
  }

  animate() {

    setInterval(() => {
      if (this.world.keyboard.RIGHT){
        this.x += this.speed;
        this.otherDirection = false;
      }
    }, 1000/50); //50 mal pro Sekunde

    setInterval(() => {
      if (this.world.keyboard.LEFT){
        this.x -= this.speed;
        this.otherDirection = true;
      }
      this.world.camera_x = -this.x;
    }, 1000/50); //50 mal pro Sekunde



    setInterval(() => {

      if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT){ // das || bedeutet "oder"
        //Walk Animation
      let i = this.currentImage % this.IMAGES_WALKING.length; //let i = 0 % 6 (Modulu % ist der mathematische Rest)
      // i = 0,1,2,3,4,5,0,1,2,3,4,5,0....
      let path = this.IMAGES_WALKING[i];
      this.img = this.imageCache[path];
      this.currentImage++;
      }
    }, 100);

    
  }


  jump() {}
}