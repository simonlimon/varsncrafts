import anime from 'animejs'

export default class Tile  {
  constructor(p, x, y, size) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.angle = this.p.HALF_PI;
    this.size = size;
    this.animated = false;
  }

  draw () {
    this.p.strokeWeight(4);
    this.p.push();
    this.p.translate(this.x+this.size/2,this.y+this.size/2);
    this.p.rotate(this.angle);
    this.p.arc(-this.size/2, -this.size/2, this.size, this.size, 0, this.p.HALF_PI);
    this.p.arc(this.size/2, this.size/2, this.size, this.size, this.p.PI, -this.p.HALF_PI);
    this.p.pop()
  };

  draw_edge () {
    this.p.strokeWeight(1);
    this.p.rect(this.x, this.y, this.size, this.size);
  };

  animate_rotation () {
    if (!this.animated){
      this.animated = true;
      var that = this;
      anime({
        targets: this,
        angle: parseFloat(this.angle) + that.p.HALF_PI,
        easing: 'easeInOutQuart',
        elasticity: 100,
        complete: function () {
          that.animated = false
        }
      })
    }
  }


};
