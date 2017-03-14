import axios from 'axios'

export default class Asteroid {
  constructor(p) {
    this.p = p;
    this.diam = 20;
    this.loc = p.createVector(0,0);
    this.v = p.createVector(0,0);
    this.a = p.createVector(0,0);
  }

  draw() {
    this.p.ellipse(this.loc.x, this.loc.y, this.diam, this.diam)
    this.loc.add(this.v)
    this.v.add(this.a)
  }

  static load_asteroids() {
    axios.get('/api/sentry').then(function (result) {
      // console.log(result)
    })
  }

}