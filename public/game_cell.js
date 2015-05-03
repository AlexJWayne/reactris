(function() {
  Reactris.GameCell = React.createClass({
    render: function() {
      return React.createElement("div", {
        "className": "cell " + (Reactris.showFilled(this.props.x, this.props.y) ? 'filled' : void 0)
      }, "\u2022");
    }
  });

}).call(this);
