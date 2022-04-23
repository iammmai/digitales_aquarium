import { Flock } from "./Flock.js";
import { Example } from "./BeispielWesen.js";
import { Boid } from "./Boid.js";
import { Wanderer } from "./Wanderer.js";
import { Plant } from "./plant.js";
import { Player } from "./Player.js";

let backgroundImg;
let plantImage;
let pinkPlanktonImg;
let pilzImg;
let spiralFisch1Img;
let spiralFisch2Img;
let spiralFischPaarImg;
let spiralFischLarveImg;
let algenImg;
let algen2Img;
let annaFisch1Img;
let annaFisch2Img;
let annaFisch3Img;
let annaFisch4Img;
let blobFischImg;
let grummelKarpfenImg;
let playerImg;
// Globale Valiablen
let flock;
let spiralFischFlock;
let annaFischFlock;
let blobFischFlock;
let grummelKarpfenFlock;
let plants = [];
let player;
let liebesQualle;
let audio;

window.preload = function () {
  backgroundImg = loadImage("./assets/Hintergrund.jpg");
  algenImg = loadImage("./assets/alge.png");
  algen2Img = loadImage("./assets/alge2.png");
  pinkPlanktonImg = loadImage("./assets/pinkPlankton.png");
  pilzImg = loadImage("./assets/pilz1.png");
  spiralFisch1Img = loadImage("./assets/spiralfisch1.png");
  spiralFisch2Img = loadImage("./assets/spiralfisch2.png");
  spiralFischPaarImg = loadImage("./assets/spiralfischPaar.png");
  spiralFischLarveImg = loadImage("./assets/spiralfischLarve.png");
  annaFisch1Img = loadImage("./assets/annafisch1.png");
  annaFisch2Img = loadImage("./assets/annafisch2.png");
  annaFisch3Img = loadImage("./assets/annafisch3.png");
  annaFisch4Img = loadImage("./assets/annafisch4.png");
  blobFischImg = loadImage("./assets/blobfisch.png");
  playerImg = loadImage("./assets/liebesfrosch.png");
  grummelKarpfenImg = loadImage("./assets/grummelKarpfen.png");
};

// Die Setup wird 1mal am Anfang ausgefuehrt.
// Hier definiert ihr Anfangskonfigurationen wie z.B. die Groesse des Canvas
window.setup = function () {
  audio = loadSound("./assets/Fisch.mp3");
  createCanvas(windowWidth, windowHeight);
  flock = new Flock();
  spiralFischFlock = new Flock();
  annaFischFlock = new Flock();
  blobFischFlock = new Flock();
  grummelKarpfenFlock = new Flock();
  // Add an initial set of boids into the system
  for (let i = 0; i < 200; i++) {
    let b = new Boid(width / 2, height / 2, pinkPlanktonImg, 15, 10);
    flock.addBoid(b);
  }

  for (let i = 0; i < 100; i++) {
    let grummel = new Boid(
      500,
      400,
      grummelKarpfenImg,
      grummelKarpfenImg.width / 5,
      grummelKarpfenImg.height / 5,
      35
    );
    grummelKarpfenFlock.addBoid(grummel);
  }

  for (let i = 0; i < 10; i++) {
    const scale = Math.floor(random(2, 4));
    const spiralFischArr = [
      spiralFisch1Img,
      spiralFisch2Img,
      spiralFischPaarImg,
      spiralFischLarveImg,
    ];
    const spiralImg = spiralFischArr[Math.floor(random(4))];
    let sFisch = new Wanderer(
      random(windowWidth),
      random(windowHeight),
      200,
      spiralImg,
      spiralImg.width / scale,
      spiralImg.height / scale,
      color(random(255), random(255), random(255))
    );
    spiralFischFlock.addBoid(sFisch);

    const annaFischImgArr = [
      annaFisch1Img,
      annaFisch2Img,
      annaFisch3Img,
      annaFisch4Img,
    ];
    const annaImg = annaFischImgArr[Math.floor(random(4))];
    let annaFisch = new Wanderer(
      random(windowWidth),
      random(windowHeight),
      200,
      annaImg
    );
    annaFischFlock.addBoid(annaFisch);
  }

  for (let i = 0; i < 2; i++) {
    let bFisch = new Wanderer(
      random(windowWidth),
      random(windowHeight),
      700,
      blobFischImg,
      200,
      200
    );
    blobFischFlock.addBoid(bFisch);
  }

  for (let i = 0; i < 10; i++) {
    const aImg = random(1) > 0.5 ? algenImg : algen2Img;
    const scale = random(5, 9);
    let p = new Plant(
      random(windowWidth),
      random(windowHeight),
      aImg,
      aImg.width / scale,
      aImg.height / scale
    );
    plants.push(p);
  }

  liebesQualle = new Wanderer(
    12,
    349,
    200,
    playerImg,
    playerImg.width / 3,
    playerImg.height / 3,
    false,
    5
  );
  player = new Player(playerImg, playerImg.width / 5, playerImg.height / 5);
};

// Die Draw-Funktion wird in einer Endlos-Schleife ausgefuehrt. Hier definiert ihr den Groessteil eures Sketches.
window.draw = function () {
  background(171, 216, 215);
  flock.run();
  spiralFischFlock.run();
  annaFischFlock.run();
  blobFischFlock.run();
  grummelKarpfenFlock.run();
  liebesQualle.run();

  plants.forEach((plant) => plant.display());
  player.display();
};

const renderMushrooms = () => {
  image(pilzImg, 200, 300, 100, 150);
  image(pilzImg, 150, 350, 70, 100);
};

window.mousePressed = function () {
  if (audio.isPlaying()) {
    // .isPlaying() returns a boolean
    audio.stop();
  } else {
    audio.play();
  }
};
