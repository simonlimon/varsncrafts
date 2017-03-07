import Truchet from '../_Truchet/Truchet'

function draw_shape(p) {
  p.push();
  p.translate(this.x+this.size/2,this.y+this.size/2);
  p.rotate(this.angle);
  p.line(-this.size/2, -this.size/2, this.size/2, this.size/2)
  p.pop();
}

function sketch (p) {
  Truchet(p, draw_shape)
}

export default sketch;