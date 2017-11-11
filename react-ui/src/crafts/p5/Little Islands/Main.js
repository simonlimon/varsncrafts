import Truchet from '../_Truchet/Truchet';

function draw_shape(p) {
  p.push();
  p.translate(this.x + this.size / 2, this.y + this.size / 2);
  p.rotate(this.angle);
  p.strokeWeight(3);
  p.arc(-this.size / 2, -this.size / 2, this.size, this.size, 0, p.HALF_PI);
  p.arc(this.size / 2, this.size / 2, this.size, this.size, p.PI, -p.HALF_PI);
  p.pop();
}

function sketch(p) {
  Truchet(p, draw_shape);
}

export default sketch;
