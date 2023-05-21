const w = 900, h = 600;
const parentId = 'app';

let pool = null;
let player = null;
// let ballImgList = [];
let img = null;
let checkbox = null;
let targetItem = null;

function preload() {
  // ballImgList = [
  //   loadImage('./assets/basketball.png'),
  //   loadImage('./assets/beach-ball.png'),
  //   loadImage('./assets/beach-ball2.png'),
  //   loadImage('./assets/football.png'),
  //   loadImage('./assets/golf-ball.png'),
  // ];
  img = loadImage('./assets/golf-ball.png');
}

function setup() {
  const canv = createCanvas(w, h);
  canv.parent(parentId);
  frameRate(30);
  // main init
  checkbox = createCheckbox('destroy mode', false);
  checkbox.parent(parentId);

  pool = new Pool([]);
}

function mousePressed() {
  const x = mouseX, y = mouseY;
  if(checkbox.checked()) pool.remove(pool.getTargetIndex(x, y));
  else if(x >= 0 && x < width && y >= 0 && y < height) {
    pool.add(new Ball({
      x, y,
      size: 64, //int(random(20,28)),
      max: {width, height},
      img: img, //random(ballImgList)
      // gravity: int(random(5, 12)),
    }));
  }
}

function draw() {
  background("#7e437e");
  // player.move();
  pool.move();
  pool.draw();
}
