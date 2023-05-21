class Entity {
  constructor({ name, x, y, size, gravity = 5, max, img }) {
    this.id = int(+new Date() + Math.random()).toString(16);
    this.name = name;
    this.x = x;
    this.y = y;
    this.size = size;
    this.gravityY = gravity;
    this.maxWidth = max.width;
    this.maxHeight = max.height;
    this.nextPosY = 0;
    this.isFall = true;
    this.isColliding = false;
    this._dist = 0;
    this._diff = 0;
    this.smooth = random(0.4, 0.6);
    this.strokeColor = 'white';
    this.img = img;
  }

  useGravity() {
    if(!this.isFall) return;

    this.nextPosY = this.y + this.gravityY;

    if(this.nextPosY < this.maxHeight-this.size/2) {
      this.y = this.nextPosY;
    }
    else if(this.nextPosY >= this.maxHeight-this.size/2) {
      this.y = this.maxHeight - this.size/2;
      this.isFall = false;
    }
  }

  checkColliding(entity) {
    if(this.id !== entity.id) {

      this._dist = dist(this.x, this.y, entity.x, entity.y) + 0.01;
      this._diff = abs(this._dist - this.size);

      if(this.size > this._dist && this.isFall) {
        this.y -= this._diff * 0.9;
        // this.y -= abs(this._dist - entity.size);
        if(this.x > entity.x) {
          this.x += this._diff * 0.55;
          // if(entity.isFall) {
          //   // entity.y -= abs(this._dist - entity.size);
          //   entity.x -= this._diff * this.smooth;
          // }
        }
        else if(this.x < entity.x) {
          this.x -= this._diff * 0.55;
          // if(entity.isFall) {
          //   // entity.y -= abs(this._dist - entity.size);
          //   entity.x += this._diff * this.smooth;
          // }
        }
        // freeze all under
        // if(!entity.isFall) {
        //   this.isFall = false;
        // }
      }
    }
  }

  move() {
    this.useGravity();
    // if(this.x < 0) {
    //   this.x = this.maxWidth/2;
    //   this.y = -this.maxHeight/2;
    // }
  }

  draw() {
    // fill(this.isFall ? 'silver' : 'orange');
    // stroke(this.strokeColor);
    // circle(this.x, this.y, this.size);
    image(
      this.img,
      this.x - this.size/2, this.y - this.size/2,
      this.size, this.size
    );

    // if(this.isColliding) {
    //   fill('rgba(129,80,182,0.26)');
    //   stroke(this.strokeColor);
    //   circle(this.x, this.y, this.size);
    // }
  }
}

class Ball extends Entity{
  constructor(props) {
    super(props);
    this.d = this.size;
  }
}
