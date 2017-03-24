import axios from 'axios'
import anime from  'animejs'

export default class Asteroid {
  static animation_duration(impact_date) {
    var years_per_second = 1
    var date = impact_date.split('-')
    var current_year = new Date().getFullYear()
    return ((parseFloat(date[0]) - current_year) / years_per_second) * 1000
  }

  constructor(p) {
    this.p = p;
    this.diam = 20;
    this.pos = p.createVector(1,1).normalize();
    this.v = p.createVector(0,0)
    this.a = p.createVector(0,0)
  }

  explode() {
    if (this.exploded) return;
    this.anim.pause()
    var p = this.p;
    this.exploded = true;
    this.particles = [];
    var quantity = Math.floor(p.map(this.diam, 0, 20, 0, 50));
    for(var i = 0; i < quantity ; i++) {
      this.particles.push({
        pos: p.createVector(parseFloat(this.pos.x),
          parseFloat(this.pos.y)),
        vel: p.createVector(p.random(-1, 1) * 5, p.random(-1, 1) * 5),
        acc: p.createVector(p.random(-0.2, 0.2), p.random(-0.2, 0.2)),
        diam: (this.diam * 0.8) * Math.random(),
        lifespan: 255.0,
        r: p.random(255),
        g: p.random(255),
        b: p.random(255)
      })
    }
  }

  update_particles() {
    for (var i = 0; i < this.particles.length; i++) {
      var prcle = this.particles[i];
      prcle.pos = prcle.pos.add(prcle.vel);
      // prcle.vel.add(prcle.acc);
      prcle.lifespan -= 2;
      if (prcle.lifespan <= 0) {
        this.particles.splice(i, 1)
      }
    }
  }

  draw() {
    var p = this.p;
    if (this.exploded) {
      for(var i = 0; i < this.particles.length ; i++) {
        var prcle = this.particles[i];
        p.push();
        p.noStroke();
        p.fill(prcle.r, prcle.g, prcle.b, prcle.lifespan)
        p.ellipse(prcle.pos.x, prcle.pos.y, prcle.diam, prcle.diam)
        p.pop()
      }
      this.update_particles()
    } else {
      p.fill(130)
      p.ellipse(this.pos.x, this.pos.y, this.diam, this.diam)
      this.pos.add(this.v)
      this.v.add(this.a)
    }
  }

  start_animation(duration) {
    this.anim = anime({
      targets: this.pos,
      x: 0,
      y: 0,
      easing: 'easeInQuad',
      duration: duration
    })
  }

  static load_asteroids(p, callback) {
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

        console.log(Asteroid.animation_duration(data[i].date));

        asteroids[i].start_animation(Asteroid.animation_duration(data[i].date))
      }
      callback()

    })
    return asteroids
  }

}