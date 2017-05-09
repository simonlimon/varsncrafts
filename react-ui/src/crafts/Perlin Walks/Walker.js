export default class Walker {
  constructor(p) {
    this.p = p;
    this.t = 0;
    this.seed = p.random() * 1000;
  }
  draw() {
    var p = this.p;
    p.noiseSeed(this.seed);
    var x = p.width * 2 * (p.noise(this.t) - 0.25);
    var y = p.height * 2 * (p.noise(this.t+5) - 0.25);
    var r = 255 * p.noise(this.t+10);
    var g = 255 * p.noise(this.t+15);
    var b = 255 * p.noise(this.t+20);

    p.noStroke();
    p.fill(r, g, b);
    p.ellipse(x, y, 75, 75);
  }
  update() {
    this.t += this.p.random() * 0.006;
  }
}