class StatusBar extends DrawableObject {
  IMAGES = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png",
  ];

  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 20;
    this.y = -10;
    this.width = 150;
    this.height = 50;
    this.setPercentage(100);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()]
    this.img = this.imageCache[path];
  }

    resolveImageIndex() {
        if(this.percentage == 100) {
           return  0; //Bild an der 0ten Stelle aus dem Array
        } else if (this.percentage > 80) {
            return 1;
        }else if (this.percentage > 60) {
            return 2;
        }else if (this.percentage > 40) {
            return 3;
        }else if (this.percentage > 20) {
            return 4;
        }else {
            return 5;
    }
  }
}
