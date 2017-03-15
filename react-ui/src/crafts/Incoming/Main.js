import Earth from './Earth'
import Asteroid from './Asteroid'

function sketch(p) {

  var earth;
  var asteroids;

  p.setup = function () {
    var canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.parent("sketch");

    p.smooth();
    p.imageMode(p.CENTER);

    earth = new Earth(p);

    asteroids = Asteroid.load_asteroids(p)

  };

  p.draw = function () {
    p.translate(p.windowWidth/2, p.windowHeight/2);
    p.background(255);
    earth.draw()

    for (var i = 0; i < asteroids.length; i++) {
      asteroids[i].draw()
    }
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
  }

}




export default sketch