export class Wanderer {
  constructor(x, y, rad, img, h = 100, w = 100, tint, speed = 2) {
    this.loc = new p5.Vector(x, y);
    this.acc = new p5.Vector(0, 0);
    this.vel = new p5.Vector(random(-speed, speed), random(-speed, speed));
    this.r = rad;
    this.displayR = rad;
    this.c = (255, 50, 200);
    this.maxspeed = speed;
    this.maxforce = 0.05;
    this.image = img;
    this.height = h;
    this.width = w;
    this.tint = tint;
  }

  wander() {
    const wanderR = 30;
    const wanderD = 90;
    this.theta += random(-0.3, 0.3);

    let circlepos = this.vel.copy();
    circlepos.normalize();
    circlepos.mult(wanderD);
    circlepos.add(this.loc);

    let h = this.vel.heading();

    let circleOffset = createVector(
      wanderR * cos(this.theta + h),
      wanderR * sin(this.theta + h)
    );
    let t = new p5.Vector.add(circlepos, circleOffset);

    let desired = new p5.Vector.sub(t, this.loc);
    desired.normalize();
    desired.mult(this.maxspeed);
    let steer = new p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }

  applyForce(force) {
    // Force = mass * acceleration
    let fAcc = new p5.Vector.div(force, this.r * 2);
    this.acc.add(fAcc);
  }

  update() {
    this.displayR = lerp(this.displayR, this.r, 0.01);
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    this.checkEdges();
    this.vel.limit(this.maxspeed);
    this.acc.mult(0);
  }

  display() {
    imageMode(CORNER);
    push();
    translate(this.loc.x, this.loc.y);
    rotate(this.vel.heading() + radians(90));
    if (this.tint) {
      tint(this.tint);
    }
    image(this.image, 0, 0, this.height, this.width);
    pop();
  }

  checkEdges() {
    const padding = this.r;
    if (this.loc.x > width + padding) {
      this.loc.x = -padding;
    } else if (this.loc.x < -padding) {
      this.loc.x = width + padding;
    }
    if (this.loc.y > height + padding) {
      this.loc.y = -padding;
    } else if (this.loc.y < -padding) {
      this.loc.y = height + padding;
    }
  }

  run() {
    this.wander();
    this.update();
    this.display();
  }
}
