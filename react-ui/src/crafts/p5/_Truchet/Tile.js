import anime from 'animejs'

export default class Tile  {
  constructor(p, x, y, r, size, draw_shape) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.angle = this.p.HALF_PI * r;
    this.size = size;
    this.animated = false;
    this.draw_shape = draw_shape
  }

  draw () {
    this.p.strokeWeight(4);
    this.draw_shape(this.p);
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
        targets: that,
        angle: parseFloat(that.angle) + that.p.HALF_PI,
        duration: 1500,
        easing: 'easeOutElastic',
        elasticity: 400,
        complete: function () {
          that.animated = false
        }
      })
    }
  }
};
