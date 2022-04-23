import { Boid } from "./Boid";

class Hunter extends Boid {
  constructor(x, y, r, img) {
    super(x, y, img);
    this.c = color(226, 43, 43);
    this.maxspeed = 4;
    this.maxforce = 0.5;
  }

  isAlive() {
    if (this.r > 0) {
      return true;
    } else {
      return false;
    }
  }

  starve() {
    this.r -= 0.05;
  }

  isHungry() {
    return this.r < 50;
  }

  hunt(food) {
    const perceptionRadius = 3 * this.r;
    let closestDistance = 9999999;
    let closestFood = undefined;
    for (f of food) {
      const distance = p5.Vector.dist(this.loc, f.loc);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestFood = f;
      }
    }
    if (closestDistance < 4 || closestDistance < this.r) {
      closestFood.eat();
      this.r += log(this.r + 2) * 10;
    }
    if (closestFood !== undefined) {
      let desired = new p5.Vector.sub(closestFood.loc, this.loc);
      desired.normalize();
      desired.mult(this.maxspeed);
      let steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxforce);
      this.applyForce(steer);
    }
  }

  wantsToMate() {
    return !this.isHungry();
  }

  mate(mateableOthers) {
    const perceptionRadius = 3 * this.r;
    let closestDistance = 9999999;
    let closestMate = undefined;
    for (o of mateableOthers) {
      const distance = p5.Vector.dist(this.loc, o.loc);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestMate = o;
      }
    }
    if (closestDistance < 4 || closestDistance < this.r) {
      return closestMate;
    }
    if (closestMate !== undefined) {
      let desired = new p5.Vector.sub(closestMate.loc, this.loc);
      desired.normalize();
      desired.mult(this.maxspeed);
      let steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxforce);
      this.applyForce(steer);
    }
    return undefined;
  }
}
