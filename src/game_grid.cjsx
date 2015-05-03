Reactris.GameGrid = React.createClass
  render: ->
    cells = []
    for y in [(Reactris.bounds.h-1)..0]
      for x in [0...Reactris.bounds.w]
        cells.push <Reactris.GameCell x={x} y={y} key="cell-#{x}-#{y}"/>

    <div id="game-grid">
      {cells}
    </div>
