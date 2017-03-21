import Earth from './Earth'
import Asteroid from './Asteroid'
import $ from 'jquery'

function sketch(p) {

  var earth;
  var asteroids;
  var year = new Date().getFullYear()

  p.setup = function () {
    var canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.parent("sketch");

    p.smooth();
    p.imageMode(p.CENTER);
    p.textAlign(p.CENTER);

    earth = new Earth(p, function () {
      asteroids = Asteroid.load_asteroids(p, function () {
        $('body').append('<div class="ui incoming year" data-inverted="" data-tooltip="Year" >'+year+'</div>')
        p.interval = setInterval(function () {
          year++;
          $('.incoming.year').html(year.toString())
        }, 1000)
      })
    });

  };

  var collision = function(pos) {
    var d = Math.sqrt(Math.pow(pos.x, 2) + Math.pow(pos.y,2))
    return d < earth.size * 0.45
  }

  p.draw = function () {
    p.translate(p.windowWidth/2, p.windowHeight/2);
    p.background(255);
    earth.draw();

    if (asteroids) {
      for (var i = 0; i < asteroids.length; i++) {
        if (!collision(asteroids[i].pos)) {
          asteroids[i].draw()
        }
      }
    }

  };



  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
  }

}




export default sketch