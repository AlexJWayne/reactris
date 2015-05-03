Reactris.GameCell = React.createClass
  render: ->
    <div className="cell #{ 'filled' if Reactris.showFilled @props.x, @props.y }">
      &bull;
    </div>
