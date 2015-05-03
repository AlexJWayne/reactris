(function() {
  Reactris.Block = (function() {
    function Block(x, y) {
      this.pos = {
        x: x != null ? x : Math.floor(Math.random() * Reactris.bounds.w),
        y: y != null ? y : 20
      };
    }

    Block.prototype.isClearRight = function() {
      return this.pos.x < Reactris.bounds.w - 1 && Reactris.isEmpty(this.pos.x + 1, this.pos.y);
    };

    Block.prototype.isClearLeft = function() {
      return this.pos.x > 0 && Reactris.isEmpty(this.pos.x - 1, this.pos.y);
    };

    Block.prototype.isClearBottom = function() {
      return this.pos.y > 0 && Reactris.isEmpty(this.pos.x, this.pos.y - 1);
    };

    Block.prototype.moveRight = function() {
      if (this.isClearRight()) {
        return this.pos.x++;
      }
    };

    Block.prototype.moveLeft = function() {
      if (this.isClearLeft()) {
        return this.pos.x--;
      }
    };

    Block.prototype.moveDown = function() {
      if (this.isClearBottom()) {
        return this.pos.y--;
      }
    };

    Block.prototype.lock = function() {
      return Reactris.grid[this.pos.x][this.pos.y] = true;
    };

    return Block;

  })();

}).call(this);
