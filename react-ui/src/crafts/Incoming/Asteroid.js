import axios from 'axios'

export default class Asteroid {
  constructor(p) {
    this.p = p;
    this.diam = 20;
    this.pos = p.createVector(1,1).normalize();
    this.v = p.createVector(0,0)
    this.a = p.createVector(0,0)
  }

  draw() {
    this.p.fill(130)
    this.p.ellipse(this.pos.x, this.pos.y, this.diam, this.diam)
    this.pos.add(this.v)
    this.v.add(this.a)
  }

  static load_asteroids(p) {
    var asteroids = [];
    this.pos = p.createVector(1,1).normalize();

    axios.get('/api/sentry').then(function (result) {
      var data = result.data.data;
      for (var i = 0; i < data.length; i++) {
        asteroids.push(new Asteroid(p));
        asteroids[i].diam = p.map(parseFloat(data[i].width), 0, 0.03, 10, 50);

        asteroids[i].pos.x = p.map(parseFloat(data[i].dist), 0, 2,
          200, Math.min(p.windowHeight, p.windowWidth));

        asteroids[i].pos.rotate(parseFloat(data[i].sigma_lov));
      }
    })

    return asteroids
  }

}