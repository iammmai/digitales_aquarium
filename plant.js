export class Plant {
  constructor(x, y, img, h, w) {
    this.x = x;
    this.y = y;
    //     this.img = loadImage("plant1.png");
    this.img = img;
    this.angle = 0;
    this.vel = 0;
    this.acc = 0.001;
    this.height = h;
    this.width = w;
    this.initalAngle = random(PI);
  }

  display() {
    if (this.angle > 0.04 || this.angle < -0.04) {
      this.acc *= -1;
    }
    this.vel = this.vel + this.acc;
    this.angle = this.angle + this.vel;
    this.vel = 0;
    imageMode(CENTER);

    push();
    translate(this.x, this.y);
    rotate(this.initalAngle + this.angle);
    image(this.img, 0, 0, this.height, this.width);
    pop();
  }
}
