import Tile from './Tile';

// TODO Mobile: rotate on shake

function generate_sketch(p, draw_shape) {
  var tile_size;
  var tiles = [];

  function GenerateGrid() {
    tiles = [];
    const num_x_tiles = p.ceil(p.width / tile_size);
    const num_y_tiles = p.ceil(p.height / tile_size);

    for (let i = 0; i < num_y_tiles; i++) {
      tiles.push([]);
      for (let j = 0; j < num_x_tiles; j++) {
        tiles[i].push(
          new Tile(
            p,
            tile_size * j,
            tile_size * i,
            i + j,
            tile_size,
            draw_shape
          )
        );
      }
    }
  }

  function RandomRotateTiles() {
    for (var i = 0; i < tiles.length; i++) {
      for (var j = 0; j < tiles[i].length; j++) {
        if (p.random([true, false])) {
          tiles[i][j].animate_rotation();
        }
      }
    }
  }

  p.setup = function() {
    if (p.windowWidth > 600) {
      tile_size = 70;
    } else {
      tile_size = p.map(p.windowWidth, 100, 600, 10, 70);
    }
    var canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.parent('sketch');

    GenerateGrid();
    p.fill(0, 0, 0, 0);
    p.smooth();
  };

  p.draw = function() {
    p.background(255);
    for (var i = 0; i < tiles.length; i++) {
      for (var j = 0; j < tiles[i].length; j++) {
        tiles[i][j].draw();
        // tiles[i][j].draw_edge()
      }
    }
  };

  p.keyPressed = function() {
    if (p.key === ' ') {
      RandomRotateTiles();
    } else if (p.key === 'S') {
      p.saveCanvas('tiling', 'png');
    }
  };

  p.mouseReleased = function() {
    tiles[p.floor(p.mouseY / tile_size)][
      p.floor(p.mouseX / tile_size)
    ].animate_rotation();
  };

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    GenerateGrid();
  };
}

export default generate_sketch;
