(function() {
  Reactris.Renderer = React.createClass({
    view: function() {
      return React.createElement("div", {
        "id": "reactris"
      }, React.createElement("h1", null, "Reactris"), React.createElement(Reactris.GameGrid, null));
    },
    render: function() {
      return React.render(this.view(), document.body);
    }
  });

}).call(this);
