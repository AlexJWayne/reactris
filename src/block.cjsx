class Reactris.Block
  constructor: (x, y)->
    @pos =
      x: x ? Math.floor Math.random() * Reactris.bounds.w
      y: y ? 20

  isClearRight: ->
    @pos.x < Reactris.bounds.w - 1 && Reactris.isEmpty(@pos.x+1, @pos.y)

  isClearLeft: ->
    @pos.x > 0 && Reactris.isEmpty(@pos.x-1, @pos.y)

  isClearBottom: ->
    @pos.y > 0 && Reactris.isEmpty(@pos.x, @pos.y-1)

  moveRight: ->
    @pos.x++ if @isClearRight()

  moveLeft: ->
    @pos.x-- if @isClearLeft()

  moveDown: ->
    @pos.y-- if @isClearBottom()

  lock: ->
    Reactris.grid[@pos.x][@pos.y] = yes
