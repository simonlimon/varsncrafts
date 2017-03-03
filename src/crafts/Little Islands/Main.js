import Tile from './Tile'

// TODO Mobile: rotate on shake

function sketch (p) {
  var tile_size;
  var tiles = [];

  p.setup = function () {
    if (p.windowWidth > 600) {
      tile_size = 90
    } else {
      tile_size = p.map(p.windowWidth, 10, 600, 30, 90)
    }
    var canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.parent = "Truchet";

    GenerateGrid();
    p.fill(0,0,0,0);
    p.smooth();
  };

  p.draw = function () {
    p.background(255);
    for (var i = 0; i < tiles.length; i++) {
      for (var j = 0; j < tiles[i].length; j++) {
        tiles[i][j].draw();
        // tiles[i][j].draw_edge()
      }
    }
  };

  p.keyPressed = function () {
    if (p.key === " ") {
      RandomRotateTiles()
    }
  };

  p.mouseReleased = function () {
    tiles[p.floor(p.mouseY/tile_size)][p.floor(p.mouseX/tile_size)].animate_rotation()
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    GenerateGrid();
  };

  var GenerateGrid = function () {
    tiles = [];
    const num_x_tiles = p.ceil(p.width / tile_size) ;
    const num_y_tiles = p.ceil(p.height / tile_size) ;

    for (let i = 0; i < num_y_tiles; i++) {
      tiles.push([]);
      for (let j = 0; j < num_x_tiles; j++) {
        tiles[i].push(new Tile(p, tile_size * j, tile_size * i, i + j, tile_size))
      }
    }
  };

  var RandomRotateTiles = function () {
    for (var i = 0; i < tiles.length; i++) {
      for (var j = 0; j < tiles[i].length; j++) {
        if (p.random([true,false])) {
          tiles[i][j].animate_rotation()
        }
      }
    }
  }

}

export default sketch;