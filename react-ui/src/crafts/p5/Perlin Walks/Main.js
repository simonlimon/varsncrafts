import Walker from './Walker';

// TODO UI for customizable parameters
// TODO Collisions

function sketch(p) {
  var walkers = [];

  p.setup = function() {
    var canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.parent('sketch');

    p.background(0);

    for (var i = 0; i < 15; i++) {
      walkers.push(new Walker(p));
    }
  };

  p.draw = function() {
    p.background(0, 10);

    for (var i = 0; i < walkers.length; i++) {
      walkers[i].draw();
      walkers[i].update();
    }
  };
}

export default sketch;
