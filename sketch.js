let bx;
let by;
let ballSize = 75;
let overBall = false;
let locked = false;
let xOffset = 0.0;
let yOffset = 0.0;
let bubbles = [];

function setup() {
  createCanvas(720, 400);
  for (let i = 0; i < 60; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(1, 30);
    let b = new Bubble(x, y, r);
    bubbles.push(b);
  }
  bx = width / 2.0;
  by = -10;
 // 화면 중앙 윗부분에서 공이 나올 수 있도록 설정함
  strokeWeight(2);
}

function draw() {
  background(0);
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].show();
  }

  // 공 위에 커서가 있는지 알려줌 - 범위를 공보다 넓게 설정하여 영향력을 알려줌
  if (
    mouseX > bx - ballSize-35 &&
    mouseX < bx + ballSize+35 &&
    mouseY > by - ballSize-35 &&
    mouseY < by + ballSize+35
  ) {
    overBall = true;
    if (!locked) {
      stroke(255);
      fill(255,255,0);
    }
  } else {
    stroke(255);
    fill(255,255);
    overBall = false;
  }


  // 공을 그려준다. ballSize로 변수를 지정해서 위에서 간편하게 바꿀 수 있도록 함
   ellipse(bx, by, ballSize, ballSize);
}

function mousePressed() {
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].clicked(mouseX, mouseY);
  }
  if (overBall) {
    locked = true;
    fill(255, 255, 255);
  } else {
    locked = false;
  }
  xOffset = mouseX - bx;
  yOffset = mouseY - by;
}

function mouseDragged() {
  if (locked) {
    bx = mouseX - xOffset;
    by = mouseY - yOffset;
  }
}

function mouseReleased() {
  locked = false;
}

class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.colorR = 0;
    this.colorG = 0;
    this.colorB = 0;
  }

  clicked(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < this.r) {
      this.colorR = 255;
      this.colorG = 255;
      this.colorB = 0;
    }
  }

  move() {
    this.x = this.x + random(-2, 2);
    this.y = this.y + random(-2, 2);
  }

  show() {0
    stroke(255);
    strokeWeight(4);
    fill(this.colorR,this.colorG,this.colorB,125);
    ellipse(this.x, this.y, this.r * 2);
  }
}

