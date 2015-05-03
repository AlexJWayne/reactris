(function() {
  var types;

  types = Object.keys(Reactris.PiecePatterns);

  Reactris.Piece = (function() {
    function Piece() {
      this.pos = {
        x: (Reactris.bounds.w - 4) / 2,
        y: Reactris.bounds.h + 4
      };
      this.orientation = 0;
      this.type = types[Math.floor(Math.random() * types.length)];
      this.generateBlocks();
    }

    Piece.prototype.generateBlocks = function() {
      var i, j, pattern, x, y;
      this.blocks = [];
      pattern = Reactris.PiecePatterns[this.type][this.orientation];
      for (y = i = 0; i < 4; y = ++i) {
        for (x = j = 0; j < 4; x = ++j) {
          if (pattern[3 - y][x]) {
            this.blocks.push(new Reactris.Block(this.pos.x + x, this.pos.y + y));
          }
        }
      }
    };

    Piece.prototype.canRotate = function() {
      var hasBlock, hasSpace, i, inBounds, j, newOrientation, pattern, x, y;
      newOrientation = this.orientation + 1;
      if (newOrientation >= 4) {
        newOrientation = 0;
      }
      pattern = Reactris.PiecePatterns[this.type][this.orientation];
      for (y = i = 0; i < 4; y = ++i) {
        for (x = j = 0; j < 4; x = ++j) {
          hasBlock = pattern[3 - y][x];
          inBounds = hasBlock && this.pos.x + x > 0 && this.pos.x + x < Reactris.bounds.w;
          hasSpace = inBounds && Reactris.isEmpty(this.pos.x + x, this.pos.y + y);
          if (hasBlock) {
            if (!hasSpace) {
              return false;
            }
          }
        }
      }
      return true;
    };

    Piece.prototype.rotate = function() {
      if (this.canRotate()) {
        this.orientation++;
        if (this.orientation >= 4) {
          this.orientation = 0;
        }
        return this.generateBlocks();
      }
    };

    Piece.prototype.isFilled = function(x, y) {
      var block, i, len, ref;
      ref = this.blocks;
      for (i = 0, len = ref.length; i < len; i++) {
        block = ref[i];
        if (block.pos.x === x && block.pos.y === y) {
          return true;
        }
      }
      return false;
    };

    Piece.prototype.isClearRight = function() {
      var block, i, len, ref;
      ref = this.blocks;
      for (i = 0, len = ref.length; i < len; i++) {
        block = ref[i];
        if (!block.isClearRight()) {
          return false;
        }
      }
      return true;
    };

    Piece.prototype.isClearLeft = function() {
      var block, i, len, ref;
      ref = this.blocks;
      for (i = 0, len = ref.length; i < len; i++) {
        block = ref[i];
        if (!block.isClearLeft()) {
          return false;
        }
      }
      return true;
    };

    Piece.prototype.isClearBottom = function() {
      var block, i, len, ref;
      ref = this.blocks;
      for (i = 0, len = ref.length; i < len; i++) {
        block = ref[i];
        if (!block.isClearBottom()) {
          return false;
        }
      }
      return true;
    };

    Piece.prototype.isOverTop = function() {
      var block, i, len, ref;
      ref = this.blocks;
      for (i = 0, len = ref.length; i < len; i++) {
        block = ref[i];
        if (block.pos.y >= Reactris.bounds.h) {
          return true;
        }
      }
      return false;
    };

    Piece.prototype.moveRight = function() {
      var block, i, len, ref, results;
      if (this.isClearRight()) {
        this.pos.x++;
        ref = this.blocks;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          block = ref[i];
          results.push(block.moveRight());
        }
        return results;
      }
    };

    Piece.prototype.moveLeft = function() {
      var block, i, len, ref, results;
      if (this.isClearLeft()) {
        this.pos.x--;
        ref = this.blocks;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          block = ref[i];
          results.push(block.moveLeft());
        }
        return results;
      }
    };

    Piece.prototype.moveDown = function() {
      var block, i, len, ref, results;
      this.pos.y--;
      if (this.isClearBottom()) {
        ref = this.blocks;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          block = ref[i];
          results.push(block.moveDown());
        }
        return results;
      }
    };

    Piece.prototype.lock = function() {
      var block, i, len, ref, results;
      ref = this.blocks;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        block = ref[i];
        results.push(block.lock());
      }
      return results;
    };

    return Piece;

  })();

}).call(this);
