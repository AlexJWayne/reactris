(function() {
  Reactris.GameGrid = React.createClass({
    render: function() {
      var cells, i, j, ref, ref1, x, y;
      cells = [];
      for (y = i = ref = Reactris.bounds.h - 1; ref <= 0 ? i <= 0 : i >= 0; y = ref <= 0 ? ++i : --i) {
        for (x = j = 0, ref1 = Reactris.bounds.w; 0 <= ref1 ? j < ref1 : j > ref1; x = 0 <= ref1 ? ++j : --j) {
          cells.push(React.createElement(Reactris.GameCell, {
            "x": x,
            "y": y,
            "key": "cell-" + x + "-" + y
          }));
        }
      }
      return React.createElement("div", {
        "id": "game-grid"
      }, cells);
    }
  });

}).call(this);
