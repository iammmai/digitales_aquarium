// Diese Klasse fasst alle zusammen
export class Flock {
  constructor() {
    // An array for all the boids
    this.boids = []; // Initialize the array
  }

  run() {
    for (let i = 0; i < this.boids.length; i++) {
      this.boids[i].run(this.boids); // Passing the entire list of boids to each boid individually
    }
  }

  addBoid(b) {
    this.boids.push(b);
  }
}
