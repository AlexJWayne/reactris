(function() {
  this.Reactris = {
    stepTime: 200,
    bounds: {
      w: 10,
      h: 20
    },
    init: function() {
      this.buildGrid();
      this.bindEvents();
      this.renderer = new Reactris.Renderer();
      this.piece = new Reactris.Piece();
      this.timer = setInterval(((function(_this) {
        return function() {
          return _this.update();
        };
      })(this)), this.stepTime);
      this.render();
      return this;
    },
    bindEvents: function() {
      return document.body.addEventListener('keydown', (function(_this) {
        return function(e) {
          switch (String.fromCharCode(e.keyCode)) {
            case 'D':
              return _this.piece.moveRight();
            case 'A':
              return _this.piece.moveLeft();
            case 'S':
              return _this.piece.rotate();
          }
        };
      })(this), false);
    },
    buildGrid: function() {
      var i, ref, results, x, y;
      this.grid = [];
      results = [];
      for (y = i = 0, ref = Reactris.bounds.h; 0 <= ref ? i < ref : i > ref; y = 0 <= ref ? ++i : --i) {
        results.push((function() {
          var base, j, ref1, results1;
          results1 = [];
          for (x = j = 0, ref1 = Reactris.bounds.w; 0 <= ref1 ? j < ref1 : j > ref1; x = 0 <= ref1 ? ++j : --j) {
            if ((base = this.grid)[x] == null) {
              base[x] = [];
            }
            results1.push(this.grid[x][y] = false);
          }
          return results1;
        }).call(this));
      }
      return results;
    },
    showFilled: function(x, y) {
      return this.isFilled(x, y) || this.piece.isFilled(x, y);
    },
    isFilled: function(x, y) {
      return this.grid[x][y];
    },
    isEmpty: function(x, y) {
      return !this.grid[x][y];
    },
    forEachCell: function(fn) {
      var i, j, ref, ref1, x, y;
      for (y = i = 0, ref = Reactris.bounds.h; 0 <= ref ? i < ref : i > ref; y = 0 <= ref ? ++i : --i) {
        for (x = j = 0, ref1 = Reactris.bounds.w; 0 <= ref1 ? j < ref1 : j > ref1; x = 0 <= ref1 ? ++j : --j) {
          fn(x, y, this.isFilled(x, y));
        }
      }
    },
    render: function() {
      return this.renderer.render();
    },
    update: function() {
      this.completeLines();
      this.updateActivePiece();
      return this.render();
    },
    updateActivePiece: function() {
      this.piece.moveDown();
      if (!this.piece.isClearBottom()) {
        this.piece.lock();
        if (this.piece.isOverTop()) {
          this.buildGrid();
        }
        return this.piece = new Reactris.Piece;
      }
    },
    completeLines: function() {
      var completeLine, i, j, k, len, line, linesToRemove, ref, ref1, results, x, y;
      linesToRemove = [];
      for (y = i = 0, ref = Reactris.bounds.h; 0 <= ref ? i < ref : i > ref; y = 0 <= ref ? ++i : --i) {
        completeLine = true;
        for (x = j = 0, ref1 = Reactris.bounds.w; 0 <= ref1 ? j < ref1 : j > ref1; x = 0 <= ref1 ? ++j : --j) {
          if (this.isEmpty(x, y)) {
            completeLine = false;
          }
        }
        if (completeLine) {
          linesToRemove.push(y);
        }
      }
      results = [];
      for (k = 0, len = linesToRemove.length; k < len; k++) {
        line = linesToRemove[k];
        results.push(this.removeLine(line));
      }
      return results;
    },
    removeLine: function(line) {
      return this.forEachCell((function(_this) {
        return function(x, y, filled) {
          if (line === y) {
            return _this.grid[x][y] = false;
          } else if (y > line) {
            return _this.grid[x][y - 1] = _this.grid[x][y];
          }
        };
      })(this));
    }
  };

}).call(this);
