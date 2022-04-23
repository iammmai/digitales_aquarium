export class Player {
  constructor(img, w, h) {
    this.img = img;
    this.x = 100;
    this.y = 100;
    this.angle1 = 0.0;
    this.segLength = 50;
    this.width = w;
    this.height = h;
  }

  display() {
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    this.angle1 = atan2(dy, dx);
    this.x = mouseX - cos(this.angle1) * this.segLength;
    this.y = mouseY - sin(this.angle1) * this.segLength;
    translate(this.x, this.y);
    rotate(this.angle1);
    image(this.img, 0, 0, this.width, this.height);
  }
}
