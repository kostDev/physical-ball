class Pool {
  #targetDist;
  #isFrozen;
  constructor(items = []) {
    this.items = items;
    this.#targetDist = -1;
    this.#isFrozen = false;
  }

  setFreeze(status = true) {
    this.#isFrozen = status;
  }

  add(item) {
    this.items.push(item);
  }
  remove(indx) {
    indx >= 0 && this.items.splice(indx, 1);
  }

  getTargetIndex(x, y) {
    this.items.forEach((item, index) => {
      if(this.#targetDist < 0) {
        if(item.size/2 >= dist(x, y, item.x, item.y)) {
          this.#targetDist=index;
        }
      }
    })
    setTimeout(() => this.#targetDist = -1, 0);
    return this.#targetDist;
  }

  move() {
    if(this.#isFrozen) return;

    this.items.forEach(item => {
      item.move();
      this.items.forEach(nextItem => {
        item.checkColliding(nextItem);
      })
    });
  }

  draw() {
    this.items.forEach(item => item.draw());
  }
}