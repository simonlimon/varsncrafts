function sketch (p) {
  var tile_size = 100;
  var tiles = [];

  p.setup = function () {
    var canvas = p.createCanvas(p.windowWidth, p.windowHeight);;
    canvas.parent = "Truchet"

    GenerateGrid()
    p.fill(0,0,0,0)
    p.smooth();
  };

  p.draw = function () {
    p.background(255)
    for (var i = 0; i < tiles.length; i++) {
      for (var j = 0; j < tiles[i].length; j++) {
        tiles[i][j].draw()
        // tiles[i][j].draw_edge()
      }
    }
  };

  //TODO Rotate on click

  p.keyPressed = function () {
    if (p.key === " ") {
      RandomRotateTiles()
    }
  }

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    GenerateGrid() //TODO Preserve rotations
  }

  var Tile = function(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.size = tile_size;
    this.animated = false;

    this.draw = function () {
      p.strokeWeight(4)
      p.push()
      p.translate(x+this.size/2,y+this.size/2)

      if (this.animated) {
        this.animation_progress += 0.015
        var angle = p.HALF_PI * (this.r-1) + this.animation_progress
        p.rotate(angle)
        if (angle >= p.HALF_PI * this.r) this.animated = false;
      } else {
        p.rotate(p.HALF_PI * this.r)
      }

      p.arc(-this.size/2, -this.size/2, this.size, this.size, 0, p.HALF_PI);
      p.arc(this.size/2, this.size/2, this.size, this.size, p.PI, -p.HALF_PI)
      p.pop()
    }

    this.draw_edge = function () {
      p.strokeWeight(1)
      p.rect(x, y, this.size, this.size);
    }
    
    this.animate_rotation = function () {
      this.r++;
      this.animated = true;
      this.animation_progress = 0;
    }
  }

  var GenerateGrid = function () {
    tiles = []
    const num_x_tiles = p.floor(p.width / tile_size) + 1;
    const num_y_tiles = p.floor(p.height / tile_size) + 1;

    for (let i = 0; i < num_y_tiles; i++) {
      tiles.push([]);
      for (let j = 0; j < num_x_tiles; j++) {
        tiles[i].push(new Tile(tile_size * j, tile_size * i, 0))
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