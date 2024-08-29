let c1,c2, c3;
let slider;
let birbs;

let flower1;
let flower2;
let flower3;
let water;

let flowerY = 300;
let flowerSize = 20;


function preload() {
  birbs = loadSound('birbs.mp3');
  flower1 = loadImage("flower1.png");
  flower2 = loadImage("flower2.png");
  flower3 = loadImage("flower3.png");
  water = loadImage("roxton-ventilador.gif");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  let button = createButton("birbs");
  button.mousePressed(allowAudio);
  button.position(5, 4);
  
  
  
  slider = createSlider(0 ,width, width, 0);
  slider.position(-2, height/2 - 80);
  slider.size(width);
  slider.addClass("mySlider");
  
  birbs.play();
  birbs.loop();
  
  garden = createGraphics(windowWidth, windowHeight);
  imageMode(CENTER);
  flower1.resize(200, 200);
  flower2.resize(200, 250);
  flower3.resize(200, 350);
  water.resize(200, 200);

  water.pause();
  
  
}

function allowAudio () {
    getAudioContext().resume();

    audio_enabled = true;
  }

function draw() {
  c1 = color(96, 195, 252);
  c2 = color(4, 219, 37);
  c3 = color(255);
  
  for (let y = 0; y < height; y++) {
    let m = map(y, 0, height, 0, 0.7);
    let bgc = lerpColor(c1, c3, m);
    stroke(bgc);
    line(0, y/1.5, width, y/1.5);
    let n = map(y, 0, height, 0, 0.7);
    let bgc2 = lerpColor(c3, c2, n);
    stroke(bgc2);
    line(0, y, width, y);
  }
  
  
  
  drawStems();
  growFlowers();

  // Draw the graphics object.
  image(garden, width / 2, height / 2);

 
  
  let sv = slider.value();
  push();
    noStroke();
    fill('rgba(22,192,194,0.59)');
    rect(0, 0, sv, height);
  pop();
  
  let vol = map(sv, 0, width, 1, 0)
  birbs.setVolume(vol);
  
   // Draw the watering can GIF.
  image(water, mouseX, mouseY);

  // Draw the pointillism effect.
  if (mouseIsPressed) {
    water.play();
  }
  
  
}

function keyPressed() {
// Save the sketch as a GIF
// when the S key is pressed.
  
// Reset the painting when
// any key is pressed.
  garden.clear();
}



function mouseReleased() {
  // Resets and pauses the GIF when
  // mouse is not being pressed.
  water.reset();
  water.pause();
}

function drawStems() {
  // Draw individual stems.
  stroke("brown");
  strokeWeight(3);
  line(100, 600, 100, flowerY);
  line(200, 600, 200, flowerY);
  line(300, 600, 300, flowerY);
}

function growFlowers() {
  // Draw the flower images.
  image(flower1, 100, flowerY, flowerSize, flowerSize);
  image(flower2, 200, flowerY, flowerSize, flowerSize);
  image(flower3, 300, flowerY, flowerSize, flowerSize);

  // Grow flowers while the mouse is pressed.
  let sv = slider.value();
  if (mouseIsPressed && sv < 50 ) {
    flowerY -= 1;
    flowerSize += 1;
  }

  // Limit flower size growth.
  if (flowerSize > 100) {
    flowerSize = 100;
  }

  // Reset growth if flower
  // reaches a certain height.
  if (flowerY < 250) {
    flowerY = 350;
    flowerSize = 20;
  }
}


