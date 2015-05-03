Reactris.Renderer = React.createClass
  view: ->
    <div id="reactris">
      <h1>Reactris</h1>
      <Reactris.GameGrid/>
    </div>

  render: ->
    React.render @view(), document.body
